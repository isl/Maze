/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

function  initOntologyOverviewPage(){
    var mapping = $.parseJSON(sessionStorage.Mapping);
    var type = mapping.info.source_info.source_schema.type;
    if (type.toLowerCase() === 'er'){   
        CurrentModeOntologyPage = OntologyPageMode.ER;
        AjaxRequests.SingleMapping.GetERMappingRules();
        $('#ontology_overview .OntologyCenteredGraph-Debug').hide();
    }
    else{
        CurrentModeOntologyPage = OntologyPageMode.TREE;
        AjaxRequests.SingleMapping.GetTreeMappingRules();
    }
    initOntologyCenteredGraph();
    animate();
}

// Global vars
var FLOOR_SIZE = 3000,
    attrSize = 20,
    elementSize = 10,
    geometries = {
        Table : function(tSize){ 
            return new THREE.BoxGeometry(tSize, 3, tSize)
        },
        Attribute : new THREE.BoxGeometry(attrSize, attrSize*2, attrSize),
        Class : new THREE.SphereGeometry(15, 10, 10),
        Literal : new THREE.BoxGeometry(20, 10, 20),
        XMLElement :  new THREE.BoxGeometry(elementSize, elementSize, elementSize)
    },
    container, stats, camera, scene, renderer,
    WIDTH_SCENE, HEIGHT_SCENE, CurrentModeOntologyPage,
    RuleClassList = [], TREE_NODES_LIST = [];
    
var MappingType = {
    Class : "target_class",
    Property : "target_property",
    SourceParent : "source_parent",
    SourceChild : "source_child"
};
var OntologyPageMode = {
    ER : "ER_MODE",
    TREE : "TREE_MODE"
};


$( document ).ready(function() {
    
    //On window resize
    $( window ).resize(function() {
        try{
            onWindowResize_AdjustScene();
        }catch (err){}
    });
});




// THRER JS SCENE FUNCTIONS
//********************************
function initOntologyCenteredGraph() {
    var mouse = new THREE.Vector2(), INTERSECTED, raycaster;
    
    //Customize the scene
    WIDTH_SCENE = $('#OntologyCenteredGraph').width(),
    HEIGHT_SCENE = $('#OntologyCenteredGraph').height();
    container = document.getElementById("OntologyCenteredGraph");
    scene = new THREE.Scene();
    
    //Create camera and add it
    camera = new THREE.PerspectiveCamera(70, WIDTH_SCENE / HEIGHT_SCENE, 1, 10000);
    camera.position.z = 1000;
    camera.position.y = 1000;
    scene.add(camera);
    
    //Create lights for shadows
    scene.add(new THREE.AmbientLight(0xf0f0f0));
    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, FLOOR_SIZE/2, 200);
    light.castShadow = true;
    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 70;
    light.shadowBias = -0.000222;
    light.shadowDarkness = 0.25;
    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;
    scene.add(light);
    spotlight = light;
    
    //Create the floor 
    var planeGeometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
    planeGeometry.rotateX(-Math.PI / 2);
    var planeMaterial = new THREE.MeshBasicMaterial({color: '#ccc'});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.name = 'plane';
    plane.select = false;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    
    //Create grids for help
    var helper = new THREE.GridHelper(1500, 100);
    helper.position.y = 1;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    helper.select = false;
    scene.add(helper);
    
    //Add Axis x,y,z (tiny)
    var axis = new THREE.AxisHelper();
    axis.position.set(0, 0, 0);
    axis.select = false;
    scene.add(axis);
    
    //Render elements to scene
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(WIDTH_SCENE, HEIGHT_SCENE);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    //Add 3d info (e.g fps)
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    // Controls for camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    controls.addEventListener('change', render);

    //Create event listener and raycaster
    document.getElementById("OntologyCenteredGraph").addEventListener( 'mousedown', on3DSceneMouseDown, false );
    raycaster = new THREE.Raycaster();
    
    //Select 3D object
    function on3DSceneMouseDown(e) {
        event.preventDefault();

        mouse.x = ( (event.clientX-$('#OntologyCenteredGraph').offset().left) / WIDTH_SCENE ) * 2 - 1;
	mouse.y = - ( (event.clientY-$('#OntologyCenteredGraph').offset().top) / HEIGHT_SCENE ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( scene.children );

        if (intersects.length > 0) {

            if (INTERSECTED !== intersects[ 0 ].object) {
                if (INTERSECTED){
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                    INTERSECTED.material.ambient = INTERSECTED.material.color;
                }
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                //INTERSECTED.material.color.setHex(0xff0000);
                //INTERSECTED.material.ambient = INTERSECTED.material.color;
                
                
                if(INTERSECTED.clicked && INTERSECTED.clicked===true){
                    //ON SELECT
                    if(CurrentModeOntologyPage === OntologyPageMode.ER){
                        DRAW_MappingRule_ER(INTERSECTED);
                        INTERSECTED = null;
                    }
                    else{//CurrentModeOntologyPage == OntologyPageMode.TREE
                        DRAW_MappingRule_TREE(INTERSECTED);
                        INTERSECTED = null;
                    }
                }
            }

        } else {
            if (INTERSECTED) 
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED = null;
        }
        renderer.render( scene, camera );
    }
}

function animate() {
    setTimeout( function() {
        requestAnimationFrame(animate);
    }, 1000 / 30 );
    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

// Adjust scene when on window resize
function onWindowResize_AdjustScene() {
    WIDTH_SCENE = $('#OntologyCenteredGraph').width();
    HEIGHT_SCENE = $('#OntologyCenteredGraph').height();
    camera.aspect = WIDTH_SCENE / HEIGHT_SCENE;
    camera.updateProjectionMatrix();

    renderer.setSize(WIDTH_SCENE, HEIGHT_SCENE);
}



// CREATE OBJECTS FUNCTIONS
//********************************

// Create a new 3d object
function Create_3D_Object(name, color, objGeometry, covered) {
    var isWireframed = true;
    if(covered==="true" || covered===true){
        isWireframed = false;
    }
    
    var object = new THREE.Mesh(objGeometry, new THREE.MeshLambertMaterial({
        color: color, wireframe: isWireframed
    }));
    object.material.ambient = object.material.color;
    object.castShadow = true;
    object.receiveShadow = true;
    object.name = name;
       
    return object;
}

// Create a new label object
function createTextLabel(height, message, labelType) {
    
    // function for drawing rounded rectangles
    function roundRect(ctx, x, y, w, h, r)
    {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    // Method that finds the next power of two number bigger than x 
    function findCeilingPowerOfTwo(x) { 
        return Math.pow(2, Math.ceil(Math.log(x) / Math.log(2))); 
    }
    
    //create font size and color parameters
    function createParameters(type){
        if (type === MappingType.SourceParent) {
            return {fontsize: 40, fontface: "Arial", borderColor: {r: 0, g: 192, b: 239, a: 1.0}};
        }
        else if (type === MappingType.SourceChild) {
            return {fontsize: 20, fontface: "Arial", borderColor: {r: 0, g: 192, b: 239, a: 1.0}};
        }
        else if (type === MappingType.Class) {
            return {fontsize: 15, fontface: "Arial", borderColor: {r: 0, g: 166, b: 90, a: 1.0}};
        }
        else if (type === MappingType.Property) {
            return {fontsize: 15, fontface: "Arial", borderColor: {r: 245, g: 188, b: 20, a: 1.0}};
        }
        else {
            return {fontsize: 20, fontface: "Arial", borderColor: {r: 0, g: 0, b: 0, a: 1.0}};
        }
    }
    
    var parameters = createParameters(labelType);
    
    //create an object
    if (parameters === undefined) {
        parameters = {};
    }

    var fontface = parameters.hasOwnProperty('fontface') ? parameters.fontface : 'Arial';
    var fontsize = parameters.hasOwnProperty('fontsize') ? parameters.fontsize : 18;
    var borderThickness = parameters.hasOwnProperty('borderThickness') ? parameters.borderThickness : 4;
    var borderColor = parameters.hasOwnProperty('borderColor') ? parameters.borderColor : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
    };
    var backgroundColor = parameters.hasOwnProperty('backgroundColor') ? parameters.backgroundColor : {
        r: 255,
        g: 255,
        b: 255,
        a: 1.0
    };
    var canvas = document.createElement('canvas');

    // Have to use textures of power of two else they are reduced to the previous min power
    canvas.width = findCeilingPowerOfTwo(canvas.width);
    canvas.height = findCeilingPowerOfTwo(canvas.height);

    var context = canvas.getContext('2d');
    context.font = 'Bold ' + fontsize + 'px ' + fontface;
    
    try{
        var find = ',';
        var re = new RegExp(find, 'g');
        message = message.replace(re, '\n');
    }catch(er){}
    // lower the font size until the text fits the canvas
    while (context.measureText(message).width > (canvas.width - 3 * borderThickness)) {
        fontsize--; // Reduce size
        context.font = 'Bold ' + fontsize + 'px ' + fontface; // Add new font size to context
    }

    var textWidth = context.measureText(message).width;

    //background color
    context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')';

    //border color
    context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')';
    context.lineWidth = borderThickness;
    roundRect(context, canvas.width / 2 - textWidth / 2 + borderThickness / 2, canvas.height / 2 + borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);

    //text color
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';

    // draw the text
    context.fillText(message, canvas.width / 2 - textWidth / 2 + borderThickness, canvas.height / 2 + fontsize + borderThickness);

    //canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    texture.minFilter = THREE.LinearFilter; // Used previously to remove warnings about power 2 textures

//    var spriteMaterial = new THREE.SpriteMaterial({
//        map: texture,
//        useScreenCoordinates: false,
//        transparent: false,
//    });
    var spriteMaterial = new THREE.SpriteMaterial(
            {map: texture, transparent: false});
    var sprite = new THREE.Sprite(spriteMaterial);

    // Make them bigger
    sprite.position.y = height + 20;
    sprite.scale.set(200, 75, 1.0);

    return sprite;
} 

// Creates lines between two objects
function createConnectionOn3DObjects(source, target, size) {
    var vec1 = source.position,
        vec2 = target.position;
    
    var color = 0x000000; //black
    if(source.typeObject === MappingType.SourceParent){
        size = 10;
        color = source.currentHex;
    }
    
    var mesh;
    var offsetY = 0.01;
    if (size === 0.0)
        size = 0.01;
    var offsetZ = size / 2.0;

    var geometry = new THREE.Geometry();

    // Material
    var material = new THREE.MeshBasicMaterial({color: color});
    // For now use Double side until we are sure that the mesh is correct
    material.side = THREE.DoubleSide;

    // Check where the bridge should be bigger
    if (Math.abs(vec1.x - vec2.x) > Math.abs(vec1.z - vec2.z)) {
        // All vertices of bridges
        geometry.vertices.push(new THREE.Vector3(vec1.x, vec1.y - offsetY, vec1.z - offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec2.x, vec2.y - offsetY, vec2.z - offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec2.x, vec2.y - offsetY, vec2.z + offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec1.x, vec1.y - offsetY, vec1.z + offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec1.x, vec1.y + offsetY, vec1.z - offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec2.x, vec2.y + offsetY, vec2.z - offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec2.x, vec2.y + offsetY, vec2.z + offsetZ));
        geometry.vertices.push(new THREE.Vector3(vec1.x, vec1.y + offsetY, vec1.z + offsetZ));
    } else {
        geometry.vertices.push(new THREE.Vector3(vec1.x - offsetZ, vec1.y - offsetY, vec1.z));
        geometry.vertices.push(new THREE.Vector3(vec2.x - offsetZ, vec2.y - offsetY, vec2.z));
        geometry.vertices.push(new THREE.Vector3(vec2.x + offsetZ, vec2.y - offsetY, vec2.z));
        geometry.vertices.push(new THREE.Vector3(vec1.x + offsetZ, vec1.y - offsetY, vec1.z));
        geometry.vertices.push(new THREE.Vector3(vec1.x - offsetZ, vec1.y + offsetY, vec1.z));
        geometry.vertices.push(new THREE.Vector3(vec2.x - offsetZ, vec2.y + offsetY, vec2.z));
        geometry.vertices.push(new THREE.Vector3(vec2.x + offsetZ, vec2.y + offsetY, vec2.z));
        geometry.vertices.push(new THREE.Vector3(vec1.x + offsetZ, vec1.y + offsetY, vec1.z));

    }

    // Now create the faces
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(4, 5, 6));
    geometry.faces.push(new THREE.Face3(4, 6, 7));
    geometry.faces.push(new THREE.Face3(3, 2, 6));
    geometry.faces.push(new THREE.Face3(3, 6, 7));
    geometry.faces.push(new THREE.Face3(0, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 4));

    // Compute normals, etc for rendering
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    mesh = new THREE.Mesh(geometry, material);
    mesh.centroid = new THREE.Vector3();
    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        mesh.centroid.add(geometry.vertices[i].clone());
    }
    mesh.centroid.divideScalar(geometry.vertices.length);
    var offset = mesh.centroid.clone();
    mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-offset.x, -offset.y, -offset.z));
    mesh.position.copy(mesh.centroid);
    
    var helper = new THREE.EdgesHelper(mesh, 0x000000);
    //var helper = new THREE.WireframeHelper(mesh, 0xffffff);
    helper.material.linewidth = 2;
    //helper.material.color.set(0x000000);
    //scene.add(helper);
    
    return mesh;
}



// DYNAMIC ER OBJECTS
//********************************
// Add an ER source schema
function addTargetSchematoScene_ER(){
    var ER = $.parseJSON(sessionStorage.ERMappingRules);
    var tables = ER.tables === null ? [] : (ER.tables instanceof Array ? ER.tables : [ER.tables]);
    var ruleClasses = ER.mappingRulesSchema.classes === null ? 
                        [] : (ER.mappingRulesSchema.classes instanceof Array ?
                        ER.mappingRulesSchema.classes : [ER.mappingRulesSchema.classes]);
    
    RuleClassList = [];
    $.each(ruleClasses, function(i, c) {
        RuleClassList.push(c);
    });
    
    drawTables_toScene(tables);
}

function drawTables_toScene(tablesList) {
    
    function findMaxAttributes(tabList){
        var maxAttr = 0;
        $.each(tabList, function(i, t) {
            var atList = t.attributes === null ? [] : (t.attributes instanceof Array ? t.attributes : [t.attributes]);
            if(atList.length >= maxAttr) maxAttr = atList.length;
        });
        return maxAttr;
    }
    
    var numberOfTables = tablesList.length,
        y = Math.sqrt(numberOfTables), // how many rows
        ceiling = Math.ceil(y), // tables per row
        maxElement = findMaxAttributes(tablesList),//Math.cbrt(getMaxOfArray(datasets));
        dist = ((Math.sqrt(maxElement)+1)*(attrSize * 3)) * 1.2;

    //distance between 3 tables = 2 * dist
    var x = -((ceiling - 1) * dist) / 2;
    var z = ((ceiling - 1) * dist) / 2;

    for (var i = 0, k = 0; i < numberOfTables; ) {
        var zCurr = z; // Initialize z again, since we are drawing a new row
        for (var j = 0; j < ceiling && i < numberOfTables && k < numberOfTables; i++, j++, k++) {
            var curTable = tablesList[k],
                color = Math.random() * 0xffffff,
                id = curTable.uid,
                name = curTable.tableName,
                attrList = curTable.attributes === null ? [] : (curTable.attributes instanceof Array ? curTable.attributes : [curTable.attributes]),
                numberOfAttrs = attrList.length,
                tSize = (Math.sqrt(numberOfAttrs)+1)*(attrSize * 3),
                tableObject = Create_3D_Object(id, color, geometries.Table(tSize), curTable.hasCovered),
                connections = curTable.connections === null ? [] : (curTable.connections instanceof Array ? curTable.connections : [curTable.connections]);
            
            //Set position
            tableObject.position.set(x, 0, zCurr);
            
            //ADD LABEL
            var labelHeight = tableObject.position.y + 2;
            var label = createTextLabel(labelHeight, name, MappingType.SourceParent);
            //move label to the right down corner
            label.position.x = tSize/2;
            label.position.z = tSize/2;
            tableObject.add(label);
            
            tableObject.label = name;
            if(curTable.connections){
                tableObject.connections = connections;
            }
            tableObject.clicked = true; //set if can be clicked
            tableObject.typeObject = MappingType.SourceParent;
            tableObject.expanded = false;
            
            scene.add(tableObject);
            
            drawAttrs_toScene(curTable, tableObject);
            zCurr -= dist; // Next table
        }
        if (i < numberOfTables) {
            x += dist; // Go to next row
        }
    }
}

function drawAttrs_toScene(table, tableObject) {
    
    var color = tableObject.material.color,//Math.random() * 0xffffff,
        attrList = table.attributes === null ? [] : (table.attributes instanceof Array ? table.attributes : [table.attributes]),
        numberOfAttrs = attrList.length + 1, //add 1 to jump the center
        rows = Math.sqrt(numberOfAttrs), // how many rows
        ceiling = Math.ceil(rows), // Attrs per row
        dist = attrSize * 3; //distance between attrs
        
      //Make darker color
//      color.r = color.r * 0.2;
//      color.g = color.g * 0.2;
//      color.b = color.b * 0.2;
      //console.log(color);

    
    //distance between 3 attrs = 2 * dist
    var x = (-((ceiling - 1) * dist) / 2) + tableObject.position.x;
    var z = (((ceiling - 1) * dist) / 2) + tableObject.position.z;
    
    for (var i = 0, k = 0; i < numberOfAttrs; ) {
        var zCurr = z; // Initialize z again, since we are drawing a new row
        for (var j = 0; j < ceiling && i < numberOfAttrs && k < numberOfAttrs; i++, j++, k++) {
            var curAttr = attrList[k];
            if(curAttr){
                //jump the center of table
                if(x===tableObject.position.x && zCurr===tableObject.position.z){
                    attrList.push(curAttr);
                }
                else{
                    var name = curAttr.name,
                        id = curAttr.uid,
                        attrObj = Create_3D_Object(id, color, geometries.Attribute, curAttr.hasCovered),
                        height = (attrObj.geometry.parameters.height/2) + (tableObject.geometry.parameters.height/2) + 2, //put it on top of table
                        connections = curAttr.connections === null ? [] : (curAttr.connections instanceof Array ? curAttr.connections : [curAttr.connections]);
                    
                    //Set position
                    attrObj.position.set(x, height, zCurr);

                    //ADD LABEL
                    var labelHeight = attrObj.position.y-5;
                    var label = createTextLabel(labelHeight, name, MappingType.SourceChild);
                    attrObj.add(label);
                    
                    attrObj.label = name;
                    if(curAttr.connections){
                        attrObj.connections = connections;
                    }
                    attrObj.typeObject = MappingType.SourceChild;
                    attrObj.clicked = true; //set if can be clicked
                    attrObj.expanded = false;
                    
                    scene.add(attrObj);
                }
                zCurr -= dist; // Next attr
            }
        }
        if (i < numberOfAttrs) {
            x += dist; // Go to next row
        }
    }
}



// DYNAMIC XML OBJECTS
//********************************
function addTargetSchematoScene_Tree(Tree_MappingRules_data){
    var Tree_MappingRules;
    if(Tree_MappingRules_data){
        Tree_MappingRules = Tree_MappingRules_data;
    }
    else{
        Tree_MappingRules = $.parseJSON(sessionStorage.TreeMappingRules);
    }
    
    
    var TREE = Tree_MappingRules.root;
    
    try{
        var ruleClasses = Tree_MappingRules.mappingRulesSchema.classes === null ? 
                        [] : (Tree_MappingRules.mappingRulesSchema.classes instanceof Array ?
                        Tree_MappingRules.mappingRulesSchema.classes : [Tree_MappingRules.mappingRulesSchema.classes]);
    
        RuleClassList = [];
        $.each(ruleClasses, function(i, c) {
            RuleClassList.push(c);
        });
    }catch(err){
        APPENDWarning('[Ontology-Centered] No rule classes found.', WARNINGSPriority.Low);
    }
    
    
    
    var TREE_NODES = generateTreeD3Layout(TREE);
    TREE_NODES_LIST = TREE_NODES;
    //elementSize = TREE_NODES.length/0.01;
    
    $.each(TREE_NODES, function(i, node) {
        if(node.depth<=2){ //only Levels [0-2]
            drawNodeElementsToSchene(node);
        }
    });
    
    $.each(TREE_NODES, function(i, node) {
       connectXMLElementsToSchene(node);
    });
    
}

function drawNodeElementsToSchene(node){
    //if it is root make it bigger
    var currentGeometry = geometries.XMLElement;
    if(node.depth===0){
        currentGeometry = new THREE.BoxGeometry(elementSize*3, elementSize*4, elementSize*3);
    }
    
    
    var name = node.name,
        id = node.id,
        children = node.children === null ? [] : (node.children instanceof Array ? node.children : [node.children]),
        connections = node.connections === null ? [] : (node.connections instanceof Array ? node.connections : [node.connections]),
        //childCount = (children === null) ? 0 : children.length-1, //-1 because each parent has an empty child
        color = Math.random() * 0xffffff,
        parentObject = Create_3D_Object(id, color, currentGeometry, node.hasCovered);

    //set position
    var X = node.x;
    var Z = node.y;
    parentObject.position.set( X, elementSize/2, Z );

    //ADD LABEL
    var labelHeight = parentObject.position.y + 2;
    var label = createTextLabel(labelHeight, name, MappingType.SourceChild);
    parentObject.add(label);
    
    parentObject.label = name;
    parentObject.clicked = true; //set if can be clicked
    parentObject.typeObject = MappingType.SourceChild;
    parentObject.expanded = false;
    parentObject.depth = node.depth;
    parentObject.hasCovered = node.hasCovered;
    if(node.connections){
        parentObject.connections = connections;
    }
    parentObject.childrenElements = children;
    scene.add(parentObject);
    return parentObject;
}

function connectXMLElementsToSchene(node){
    var conList = [];
    var nodeId = node.id;
    var children = node.children === null ? [] : (node.children instanceof Array ? node.children : [node.children]);
    var parent = scene.getObjectByName( nodeId );
    if(children && parent){
        $.each(children, function(i, c) {
            try{
                var child = scene.getObjectByName( c.name );
                if(child){
                    var connection = createConnectionOn3DObjects(parent, child, 1);
                    scene.add(connection);
                    conList.push(connection);
                }
            }
            catch (error){
                //APPENDWarning('[Ontology-centered] Cannot connect objects (' + error + ')', WARNINGSPriority.Medium);
            }
        });
    }
    return conList;
}

function generateTreeD3Layout(data) {
    var diameter = FLOOR_SIZE-500;
    
    var tree = d3.layout.tree()
            .size([360, diameter / 2 - 120])
            .separation(function (a, b) {
                return (a.parent == b.parent ? 1 : 2) / a.depth;
            });

    var diagonal = d3.svg.diagonal.radial()
            .projection(function (d) {
                return [d.y, d.x / 180 * Math.PI];
            });

    var svg = d3.select("#OntologyCenteredGraphDebug").append("svg")
            .attr("width", diameter)
            .attr("height", diameter - 150)
            .append("g")
            //.attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
            .attr("transform", "translate(0)");

    var nodes = tree.nodes(data),
        links = tree.links(nodes);
        
    var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);
    
    var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            })
            .attr("uid", function (d, i) {
                return d.uid;
            })
            .attr("name", function (d, i) {
                return d.name;
            });

    node.append("circle")
            .attr("r", 4.5);

    node.append("text")
            .attr("dy", ".31em")
            .attr("text-anchor", function (d) {
                return d.x < 180 ? "start" : "end";
            })
            .attr("transform", function (d) {
                return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
            })
            .text(function (d) {
                return d.name;
            });


    d3.select(self.frameElement).style("height", diameter - 150 + "px");
    
    
    function findNodeWithID(id){
        var curNode;
        svg.selectAll('.node').each(function(d, i) {
            if(d.name === id) curNode = d;
            return false;
        });
        return curNode;
    }
    
    var TREE_NODES = [];
    var parentPos = $('#OntologyCenteredGraphDebug > svg').position();
    $('#OntologyCenteredGraphDebug > svg g.node').each(function( index, d ) {
        var childPos = $(this).position();
        var childOffset = {
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left
        };
        var id = $(this).attr('name');
        var curNode = findNodeWithID(id);
        if(curNode && curNode.label !== ""){
            TREE_NODES.push(
                    {
                        id: curNode.name,
                        name: curNode.label,
                        x: childOffset.left,
                        y: childOffset.top,
                        children: curNode.children,
                        depth: curNode.depth,
                        hasCovered: curNode.hasCovered,
                        connections: curNode.connections
                    }
            );
        }
        
    });

    $('#ontology_overview .OntologyCenteredGraph-Debug').hide();
    return TREE_NODES;
}




//Helper
function findClassColorFromCidoc3DPage(labels){
    function stringStartsWith (string, prefix) {
        return string.slice(0, prefix.length) === prefix;
    }
    
    var cidocColorsDefs = function(c) {
        var cHex;
        switch(c) {
            case 'blue': cHex = 0x007fff; break;
            case 'white': cHex = 0xffffff; break;
            case 'brown': cHex = 0x990000; break;
            case 'pink': cHex = 0xff66cc; break;
            case 'grey': cHex = 0x666666; break;
            case 'yellow': cHex = 0xffd11a; break;
            case 'light_grey': cHex = 0xcccccc; break;
            case 'green': cHex = 0x66ff99; break;
            default: return;
        }
        return cHex;
    };
    
    var cidocColor;
    var matchClasses = [];
    var labelList = labels === null ? [] : (labels instanceof Array ? labels : [labels]);
    $.each(labelList, function (i, lab) {
        if(stringStartsWith(lab, 'crm:') === true){
            var res = lab.replace('crm:', '');
            $.each(CIDOC_CRM_GRAPH.TargetSchemaFile.classes, function (i, cc) {
                if(cc.label === res) matchClasses.push(cc);
            });
        }
    });
    
    if(matchClasses.length !== 0){
        var color = matchClasses[0].color;
        cidocColor = cidocColorsDefs(color);
    }
    
    return cidocColor;
}

function findNodeFromTREE_NODES_LIST(ID){
    var node;
    $.each(TREE_NODES_LIST, function(i, n) {
        if(n.id === ID) node = n;
    });
    return node;
}

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////////////////////////////

function DRAW_MappingRule_ER(INTERSECTED){
    
    function findRuleClassFromSchema(id) {
        var ruleClass;
        $.each(RuleClassList, function (i, c) {
            if (c.uid === id)
                ruleClass = c;
        });
        return ruleClass;
    }
    
    function generatePosition(){
        
    }

    
    //do nothing if is already expanded
    if(INTERSECTED.expanded===true){ 
        REMOVE_MappingRule(INTERSECTED);
        return false;
    }
    //console.log(INTERSECTED);
    
    var height = 200;
    if(INTERSECTED.typeObject === MappingType.Class)
    {
        height = 50;
    }
    
    var id = INTERSECTED.name,
        name = INTERSECTED.label,
        color = INTERSECTED.currentHex,
        x = INTERSECTED.position.x,
        y = INTERSECTED.position.y + height,
        z = INTERSECTED.position.z,
        typeObj = INTERSECTED.typeObject,
        connections = INTERSECTED.connections === null ? [] : (INTERSECTED.connections instanceof Array ? INTERSECTED.connections : [INTERSECTED.connections]);
        
        //Expand its connections FROM this obj
        if(INTERSECTED.connections){
            $.each(connections, function(i, con) {
                var targetObj = scene.getObjectByName( con.target );

                if(!targetObj){
                    var ruleClass = findRuleClassFromSchema(con.target),
                        label = JSON.stringify(ruleClass.label),
                        connectionss = ruleClass.connections === null ? [] : (ruleClass.connections instanceof Array ? ruleClass.connections : [ruleClass.connections]);
                    
                    //add cidoc color
                    if(ruleClass.label){
                        var cidocColor = findClassColorFromCidoc3DPage(ruleClass.label);
                        if(cidocColor) color = cidocColor;
                    }
                    
                    //create 3d object
                    if(label.toLowerCase().indexOf("literal") > -1){//contains
                        targetObj = Create_3D_Object(con.target, color, geometries.Literal, true);
                        label = "Literal";
                    }
                    else{
                        targetObj = Create_3D_Object(con.target, color, geometries.Class, true);
                    }
                    y = y + i*50;
                    targetObj.position.set( x, y, z );
                    

                    //add label
                    var labelHeight = 5;
                    var clabel = createTextLabel(labelHeight, label, MappingType.Class);
                    targetObj.add(clabel);

                    targetObj.label = label;
                    if(ruleClass.connections){
                        targetObj.connections = connectionss;
                    }
                    targetObj.typeObject = MappingType.Class;
                    targetObj.clicked = true; //set if can be clicked
                    targetObj.expanded = false;
                    
                    $.each(connectionss, function(j, conn) {
                        var tObj = scene.getObjectByName( conn.target );
                        if(tObj){
                            //create connection between objects
                            var nestedConn = createConnectionOn3DObjects(targetObj, tObj, 5);
                            var nestedLabel;
                            if(targetObj.typeObject.indexOf("source_") > -1 || tObj.typeObject.indexOf("source_") > -1){
                                nestedLabel = createTextLabel(0, "type", MappingType.Property);
                            }
                            else{
                                nestedLabel = createTextLabel(0, conn.property, MappingType.Property);
                            }
                            nestedConn.add(nestedLabel);
                            scene.add(nestedConn);
                        }
                    });

                    scene.add(targetObj);
                }

                //create connection between objects
                var connection = createConnectionOn3DObjects(INTERSECTED, targetObj, 5);
                var label;
                if(INTERSECTED.typeObject.indexOf("source_") > -1 || targetObj.typeObject.indexOf("source_") > -1){
                    label = createTextLabel(0, "type", MappingType.Property);
                }
                else{
                    label = createTextLabel(0, con.property, MappingType.Property);
                }
                connection.add(label);
                scene.add(connection);
            });
        }

    INTERSECTED.expanded = true;
}

function DRAW_MappingRule_TREE(INTERSECTED){
    
    function findRuleClassFromSchema(id) {
        var ruleClass;
        $.each(RuleClassList, function (i, c) {
            if (c.uid === id)
                ruleClass = c;
        });
        return ruleClass;
    }
    
    function generatePosition(){
        //TODO: create more effective layout
    }

    
    //manage what to do on click
    if(INTERSECTED.expanded===true){ 
        REMOVE_MappingRule(INTERSECTED);
        return false;
    }
    //expand its children only
    var addedChildren = expandChildrenElementsToScene(INTERSECTED);
    if(addedChildren.length !== 0){
        INTERSECTED.addedChildren = addedChildren;
        return false;
    }
    
    var addedObjectsToScene = [];
    var height = 200;
    if(INTERSECTED.typeObject === MappingType.Class)
    {
        height = 50;
    }
    
    var id = INTERSECTED.name,
        name = INTERSECTED.label,
        color = INTERSECTED.currentHex,
        x = INTERSECTED.position.x,
        y = INTERSECTED.position.y + height,
        z = INTERSECTED.position.z,
        typeObj = INTERSECTED.typeObject,
        connections = INTERSECTED.connections === null ? [] : (INTERSECTED.connections instanceof Array ? INTERSECTED.connections : [INTERSECTED.connections]);
        
        //Expand its connections FROM this obj
        if(INTERSECTED.connections){
            $.each(connections, function(i, con) {
                var targetObj = scene.getObjectByName( con.target );

                if(!targetObj){
                    var ruleClass = findRuleClassFromSchema(con.target),
                        label = JSON.stringify(ruleClass.label),
                        connectionss = ruleClass.connections === null ? [] : (ruleClass.connections instanceof Array ? ruleClass.connections : [ruleClass.connections]);
                    
                    //add cidoc color
                    if(ruleClass.label){
                        var cidocColor = findClassColorFromCidoc3DPage(ruleClass.label);
                        if(cidocColor) color = cidocColor;
                    }
                    
                    //create 3d object
                    if(label.toLowerCase().indexOf("literal") > -1){//contains
                        targetObj = Create_3D_Object(con.target, color, geometries.Literal, true);
                        label = "Literal";
                    }
                    else{
                        targetObj = Create_3D_Object(con.target, color, geometries.Class, true);
                    }
                    var Y = y + i*50;
                    targetObj.position.set( x, Y, z );
                    

                    //add label
                    var labelHeight = 5;
                    var clabel = createTextLabel(labelHeight, label, MappingType.Class);
                    targetObj.add(clabel);

                    targetObj.label = label;
                    if(ruleClass.connections){
                        targetObj.connections = connectionss;
                    }
                    targetObj.typeObject = MappingType.Class;
                    targetObj.clicked = true; //set if can be clicked
                    targetObj.expanded = false;
                    
                    $.each(connectionss, function(j, conn) {
                        var tObj = scene.getObjectByName( conn.target );
                        if(tObj){
                            //create connection between objects
                            var nestedConn = createConnectionOn3DObjects(targetObj, tObj, 5);
                            var nestedLabel;
                            if(targetObj.typeObject.indexOf("source_") > -1 || tObj.typeObject.indexOf("source_") > -1){
                                nestedLabel = createTextLabel(0, "type", MappingType.Property);
                            }
                            else{
                                nestedLabel = createTextLabel(0, conn.property, MappingType.Property);
                            }
                            //var nestedLabel = createTextLabel(0, conn.property, MappingType.Property);
                            nestedConn.add(nestedLabel);
                            scene.add(nestedConn);
                            addedObjectsToScene.push(nestedConn);
                        }
                    });

                    scene.add(targetObj);
                    addedObjectsToScene.push(targetObj);
                }

                //create connection between objects
                var connection = createConnectionOn3DObjects(INTERSECTED, targetObj, 5);
                //var label = createTextLabel(0, con.property, MappingType.Property);
                var label;
                if(INTERSECTED.typeObject.indexOf("source_") > -1 || targetObj.typeObject.indexOf("source_") > -1){
                    label = createTextLabel(0, "type", MappingType.Property);
                }
                else{
                    label = createTextLabel(0, con.property, MappingType.Property);
                }
                connection.add(label);
                scene.add(connection);
                addedObjectsToScene.push(connection);
            });
        }
    INTERSECTED.addedRules = addedObjectsToScene;
    INTERSECTED.expanded = true;
}

function expandChildrenElementsToScene(INTERSECTED){
    var expanded = false;
    var addedChildToScene = [];
    var curNode = findNodeFromTREE_NODES_LIST(INTERSECTED.name);
    var childrenElements = INTERSECTED.childrenElements === null ? [] : (INTERSECTED.childrenElements instanceof Array ? INTERSECTED.childrenElements : [INTERSECTED.childrenElements]);
    if(INTERSECTED.childrenElements){
        try{
            $.each(childrenElements, function(i, n) {
                var childObj = scene.getObjectByName( n.name );
                if(!childObj){
                    var node = findNodeFromTREE_NODES_LIST(n.name);
                    if(node) {
                        var addedObj = drawNodeElementsToSchene(node);
                        addedChildToScene.push(addedObj);
                        expanded = true;
                    }
                }
            });
        }catch (er){
            expanded = false;
        }
    }
    
    var conList = [];
    if(expanded===true){
        conList = connectXMLElementsToSchene(curNode);
    }
    return addedChildToScene.concat(conList);
}

function REMOVE_MappingRule(INTERSECTED){
    var id = INTERSECTED.name,
        name = INTERSECTED.label,
        color = INTERSECTED.currentHex;
    
    var addedRules = INTERSECTED.addedRules === null ? [] : (INTERSECTED.addedRules instanceof Array ? INTERSECTED.addedRules : [INTERSECTED.addedRules]);  
    if(INTERSECTED.addedRules){
        $.each(addedRules, function(i, n) {
            var Obj = scene.getObjectByName( n.name );
            if(Obj) {
                scene.remove(Obj);
            }
        });
    }
    
    var addedChildren = INTERSECTED.addedChildren === null ? [] : (INTERSECTED.addedChildren instanceof Array ? INTERSECTED.addedChildren : [INTERSECTED.addedChildren]);  
    if(INTERSECTED.addedChildren){
        $.each(addedChildren, function(i, n) {
            scene.remove(n);
        });
    }
    
    INTERSECTED.expanded = false;    
}


