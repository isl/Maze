/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */


// Contains classes which we want 
// to exclude from metrics
//**************************
var EXCLUDE_CLASSES_CIDOC = [
    "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
    "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
    "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
    "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item"
];


//**************************
// CIDOC - CRM Default Graph
//**************************
var CIDOC_CRM_GRAPH = 
        {
	"TargetSchemaFile": {
		"Name": "CIDOC-CRM",
		"FileName": "cidoc_crm_v6.0-draft-2015January.rdfs",
		"Version": "6.0",
		"Type": "rdfs",
		"targetSchemaMetrics": {
			"classCount": "85",
			"subClassCount": "0",
			"propertyCount": "286",
			"subPropertyCount": "0"
		},
		"classes": [{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E70_Thing",
			"comment": "This general class comprises discrete, identifiable, instances of E77 Persistent Item that are documented as single units, that either consist of matter or depend on being carried by matter and are ch...",
			"size": "43.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"http://www.cidoc-crm.org/cidoc-crm/E72_Legal_Object"],
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E10_Transfer_of_Custody",
			"comment": "This class comprises transfers of physical custody of objects between instances of E39 Actor. \nThe recording of the donor and/or recipient is optional. It is possible that in an instance of E10 Transf...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E29_Design_or_Procedure",
			"comment": "This class comprises documented plans for the execution of actions in order to achieve a result of a specific quality, form or contents. In particular it comprises plans for deliberate human activitie...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E84_Information_Carrier",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E84_Information_Carrier",
			"comment": "This class comprises all instances of E22 Man-Made Object that are explicitly designed to act as persistent physical carriers for instances of E73 Information Object.\nAn E84 Information Carrier may or...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E31_Document",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E31_Document",
			"comment": "This class comprises identifiable immaterial items that make propositions about reality.\nThese propositions may be expressed in text, graphics, images, audiograms, videograms or by other similar means...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E32_Authority_Document"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E11_Modification",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E11_Modification",
			"comment": "This class comprises all instances of E7 Activity that create, alter or change E24 Physical Man-Made Thing. \nThis class includes the production of an item from raw materials, and other so far undocume...",
			"size": "3.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E12_Production",
			"http://www.cidoc-crm.org/cidoc-crm/E80_Part_Removal",
			"http://www.cidoc-crm.org/cidoc-crm/E79_Part_Addition"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E58_Measurement_Unit",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "grey",
			"label": "E58_Measurement_Unit",
			"comment": "This class is a specialization of E55 Type and comprises the types of measurement units: feet, inches, centimetres, litres, lumens, etc. \nThis type is used categorically in the model without reference...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E6_Destruction",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E6_Destruction",
			"comment": "This class comprises events that destroy one or more instances of E18 Physical Thing such that they lose their identity as the subjects of documentation. \nSome destruction events are intentional, whi...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E18_Physical_Thing",
			"comment": "This class comprises all persistent physical items with a relatively stable form, man-made or natural. \nDepending on the existence of natural boundaries of such things, the CRM distinguishes the insta...",
			"size": "10.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E26_Physical_Feature",
			"http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E26_Physical_Feature",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E26_Physical_Feature",
			"comment": "This class comprises identifiable features that are physically attached in an integral way to particular physical objects. \nInstances of E26 Physical Feature share many of the attributes of instances ...",
			"size": "2.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E27_Site",
			"http://www.cidoc-crm.org/cidoc-crm/E25_Man-Made_Feature"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E52_Time-Span",
			"comment": "This class comprises abstract temporal extents, in the sense of Galilean physics, having a beginning, an end and a duration. \nTime Span has no other semantic connotations. Time-Spans are used to defin...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E93_Spacetime_Snapshot",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E93_Spacetime_Snapshot",
			"comment": "This class comprises instances of E92 Spacetime Volume that result from intersection of instances of E92 Spacetime Volume with an instance of E52 Time-Span. The identity of an instance of this class i...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E71_Man-Made_Thing",
			"comment": "This class comprises discrete, identifiable man-made items that are documented as single units. \nThese items are either intellectual products or man-made physical things, and are characterized by rela...",
			"size": "35.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E28_Conceptual_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E80_Part_Removal",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E80_Part_Removal",
			"comment": "This class comprises the activities that result in an instance of E18 Physical Thing being decreased by the removal of a part.\nTypical scenarios include the detachment of an accessory, the removal of ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E7_Activity",
			"comment": "This class comprises actions intentionally carried out by instances of E39 Actor that result in changes of state in the cultural, social, or physical systems documented. \nThis notion includes complex,...",
			"size": "19.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E11_Modification",
			"http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"http://www.cidoc-crm.org/cidoc-crm/E86_Leaving",
			"http://www.cidoc-crm.org/cidoc-crm/E65_Creation",
			"http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"http://www.cidoc-crm.org/cidoc-crm/E85_Joining",
			"http://www.cidoc-crm.org/cidoc-crm/E13_Attribute_Assignment",
			"http://www.cidoc-crm.org/cidoc-crm/E66_Formation",
			"http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"http://www.cidoc-crm.org/cidoc-crm/E87_Curation_Activity"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E87_Curation_Activity",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E87_Curation_Activity",
			"comment": "This class comprises the activities that result in the continuity of management and the preservation and evolution of instances of E78 Collection, following an implicit or explicit curation plan. \nIt ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E20_Biological_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E20_Biological_Object",
			"comment": "This class comprises individual items of a material nature, which live, have lived or are natural products of or from living organisms. \nArtificial objects that incorporate biological elements, such a...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E21_Person"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E32_Authority_Document",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E32_Authority_Document",
			"comment": "This class comprises encyclopaedia, thesauri, authority lists and other documents that define terminology or conceptual systems for consistent use.\n",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E41_Appellation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E41_Appellation",
			"comment": "This class comprises signs, either meaningful or not, or arrangements of signs following a specific syntax, that are used or can be used to refer to and identify a specific instance of some class or c...",
			"size": "12.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E82_Actor_Appellation",
			"http://www.cidoc-crm.org/cidoc-crm/E51_Contact_Point",
			"http://www.cidoc-crm.org/cidoc-crm/E49_Time_Appellation",
			"http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"http://www.cidoc-crm.org/cidoc-crm/E35_Title",
			"http://www.cidoc-crm.org/cidoc-crm/E44_Place_Appellation",
			"http://www.cidoc-crm.org/cidoc-crm/E75_Conceptual_Object_Appellation"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E12_Production",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E12_Production",
			"comment": "This class comprises activities that are designed to, and succeed in, creating one or more new items. \nIt specializes the notion of modification into production. The decision as to whether or not an o...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E34_Inscription",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E34_Inscription",
			"comment": "This class comprises recognisable, short texts attached to instances of E24 Physical Man-Made Thing. \nThe transcription of the text can be documented in a note by P3 has note: E62 String. The alphabet...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E78_Collection",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E78_Collection",
			"comment": "This class comprises aggregations of instances of E18 Physical Thing that are assembled and maintained (“curated” and “preserved,” in museological terminology) by one or more instances of E39 Actor ov...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E51_Contact_Point",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E51_Contact_Point",
			"comment": "This class comprises identifiers employed, or understood, by communication services to direct communications to an instance of E39 Actor. These include E-mail addresses, telephone numbers, post office...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E45_Address"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E82_Actor_Appellation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E82_Actor_Appellation",
			"comment": "This class comprises any sort of name, number, code or symbol characteristically used to identify an E39 Actor. \nAn E39 Actor will typically have more than one E82 Actor Appellation, and instances of ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E8_Acquisition",
			"comment": "This class comprises transfers of legal ownership from one or more instances of E39 Actor to one or more other instances of E39 Actor. \nThe class also applies to the establishment or loss of ownership...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E25_Man-Made_Feature",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E25_Man-Made_Feature",
			"comment": "This class comprises physical features that are purposely created by human activity, such as scratches, artificial caves, artificial water channels, etc. \nNo assumptions are made as to the extent of m...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E28_Conceptual_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E28_Conceptual_Object",
			"comment": "This class comprises non-material products of our minds and other human produced data that \t\thave become objects of a discourse about their identity, circumstances of creation or historical \t\timplicat...",
			"size": "29.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E86_Leaving",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E86_Leaving",
			"comment": "This class comprises the activities that result in an instance of E39 Actor to be disassociated from an instance of E74 Group. This class does not imply initiative by either party. \nTypical scenarios ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E40_Legal_Body",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "pink",
			"label": "E40_Legal_Body",
			"comment": "This class comprises institutions or groups of people that have obtained a legal recognition as a group and can act collectively as agents. \nThis means that they can perform actions, own property, cr...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E92_Spacetime_Volume",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E92_Spacetime_Volume",
			"comment": "This class comprises 4 dimensional point sets (volumes) in physical spacetime regardless its true geometric form. They may derive their identity from being the extent of a material phenomenon or from ...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E93_Spacetime_Snapshot"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E19_Physical_Object",
			"comment": "This class comprises items of a material nature that are units for documentation and have physical boundaries that separate them completely in an objective way from other objects. \nThe class also incl...",
			"size": "4.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E22_Man-Made_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E20_Biological_Object"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E17_Type_Assignment",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E17_Type_Assignment",
			"comment": "This class comprises the actions of classifying items of whatever kind. Such items include objects, specimens, people, actions and concepts. \nThis class allows for the documentation of the context of ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E35_Title",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E35_Title",
			"comment": "This class comprises the names assigned to works, such as texts, artworks or pieces of music. \nTitles are proper noun phrases or verbal phrases, and should not be confused with generic object names su...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E77_Persistent_Item",
			"comment": "This class comprises items that have a persistent identity, sometimes known as “endurants” in philosophy. \nThey can be repeatedly recognized within the duration of their existence by identity criteria...",
			"size": "47.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"http://www.cidoc-crm.org/cidoc-crm/E39_Actor"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E64_End_of_Existence",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E64_End_of_Existence",
			"comment": "This class comprises events that end the existence of any E77 Persistent Item. \nIt may be used for temporal reasoning about things (physical items, groups of people, living beings) ceasing to exist; i...",
			"size": "4.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E68_Dissolution",
			"http://www.cidoc-crm.org/cidoc-crm/E6_Destruction",
			"http://www.cidoc-crm.org/cidoc-crm/E69_Death",
			"http://www.cidoc-crm.org/cidoc-crm/E81_Transformation"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E36_Visual_Item",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E36_Visual_Item",
			"comment": "This class comprises the intellectual or conceptual aspects of recognisable marks and images.\nThis class does not intend to describe the idiosyncratic characteristics of an individual physical embodim...",
			"size": "3.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E37_Mark",
			"http://www.cidoc-crm.org/cidoc-crm/E38_Image"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E4_Period",
			"comment": "This class comprises sets of coherent phenomena or cultural manifestations bounded in time and space.\n\nIt is the social or physical coherence of these phenomena that identify an E4 Period and not the ...",
			"size": "28.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E5_Event"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E81_Transformation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E81_Transformation",
			"comment": "This class comprises the events that result in the simultaneous destruction of one or more than one E77 Persistent Item and the creation of one or more than one E77 Persistent Item that preserves reco...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E9_Move",
			"comment": "This class comprises changes of the physical location of the instances of E19 Physical Object. \nNote, that the class E9 Move inherits the property P7 took place at (witnessed): E53 Place. This propert...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E50_Date",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E50_Date",
			"comment": "This class comprises specific forms of E49 Time Appellation.",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E14_Condition_Assessment",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E14_Condition_Assessment",
			"comment": "This class describes the act of assessing the state of preservation of an object during a particular period. \nThe condition assessment may be carried out by inspection, measurement or through historic...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "grey",
			"label": "E57_Material",
			"comment": "This class is a specialization of E55 Type and comprises the concepts of materials. \nInstances of E57 Material may denote properties of matter before its use, during its use, and as incorporated in an...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E1_CRM_Entity",
			"comment": "This class comprises all things in the universe of discourse of the CIDOC Conceptual Reference Model. \nIt is an abstract concept providing for three general properties:\n1.\tIdentification by name or ap...",
			"size": "84.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"http://www.cidoc-crm.org/cidoc-crm/E92_Spacetime_Volume"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E48_Place_Name",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E48_Place_Name",
			"comment": "This class comprises particular and common forms of E44 Place Appellation. \nPlace Names may change their application over time: the name of an E53 Place may change, and a name may be reused for a different E53 Place. Instances of E48 Place Name are typically subject to place name gazetteers.",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "pink",
			"label": "E74_Group",
			"comment": "This class comprises any gatherings or organizations of E39 Actors that act collectively or in a similar way due to any form of unifying relationship. In the wider sense this class also comprises offi...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E40_Legal_Body"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E49_Time_Appellation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E49_Time_Appellation",
			"comment": "This class comprises all forms of names or codes, such as historical periods, and dates, which are characteristically used to refer to a specific E52 Time-Span. \nThe instances of E49 Time Appellation ...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E50_Date"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E79_Part_Addition",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E79_Part_Addition",
			"comment": "This class comprises activities that result in an instance of E24 Physical Man-Made Thing being increased, enlarged or augmented by the addition of a part. \nTypical scenarios include the attachment of...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E91_Co-Reference_Assignment",
			"comment": "This class comprises actions of making the assertion whether two or more particular instances of E89 Propositional Object refer to the same instance of E1 CRM Entity. The assertion is based on the ass...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E90_Symbolic_Object",
			"comment": "This class comprises identifiable symbols and any aggregation of symbols, such as characters, identifiers, traffic signs, emblems, texts, data sets, images, musical scores, multimedia objects, compute...",
			"size": "22.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E73_Information_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E41_Appellation"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E47_Spatial_Coordinates",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E47_Spatial_Coordinates",
			"comment": "This class comprises the textual or numeric information required to locate specific instances of E53 Place within schemes of spatial identification. \n\nCoordinates are a specific form of E44 Place Appe...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E15_Identifier_Assignment",
			"comment": "This class comprises activities that result in the allocation of an identifier to an instance of E1 CRM Entity. An E15 Identifier Assignment may include the creation of the identifier from multiple co...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E3_Condition_State",
			"comment": "This class comprises the states of objects characterised by a certain condition over a time-span. \nAn instance of this class describes the prevailing physical condition of any material object or featu...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E54_Dimension",
			"comment": "This class comprises quantifiable properties that can be measured by some calibrated means and can be approximated by values, i.e. points or regions in a mathematical or conceptual space, such as natu...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E46_Section_Definition",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E46_Section_Definition",
			"comment": "This class comprises areas of objects referred to in terms specific to the general geometry or structure of its kind. \nThe 'prow' of the boat, the 'frame' of the picture, the 'front' of the building a...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E42_Identifier",
			"comment": "This class comprises strings or codes assigned to instances of E1 CRM Entity in order to identify them uniquely and permanently within the context of one or more organisations. Such codes are often kn...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E63_Beginning_of_Existence",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E63_Beginning_of_Existence",
			"comment": "This class comprises events that bring into existence any E77 Persistent Item. \nIt may be used for temporal reasoning about things (intellectual products, physical items, groups of people, living bein...",
			"size": "6.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E12_Production",
			"http://www.cidoc-crm.org/cidoc-crm/E65_Creation",
			"http://www.cidoc-crm.org/cidoc-crm/E81_Transformation",
			"http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"http://www.cidoc-crm.org/cidoc-crm/E66_Formation"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E73_Information_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E73_Information_Object",
			"comment": "This class comprises identifiable immaterial items, such as a poems, jokes, data sets, images, texts, multimedia objects, procedural prescriptions, computer program code, algorithm or mathematical for...",
			"size": "9.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"http://www.cidoc-crm.org/cidoc-crm/E36_Visual_Item",
			"http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E31_Document"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E30_Right",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E30_Right",
			"comment": "This class comprises legal privileges concerning material and immaterial things or their derivatives. \nThese include reproduction and property rights",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E85_Joining",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E85_Joining",
			"comment": "This class comprises the activities that result in an instance of E39 Actor becoming a member of an instance of E74 Group. This class does not imply initiative by either party.\nTypical scenarios inclu...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E2_Temporal_Entity",
			"comment": "This class comprises all phenomena, such as the instances of E4 Periods, E5 Events and states, which happen over a limited extent in time. \n\tIn some contexts, these are also called perdurants. This cl...",
			"size": "30.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"http://www.cidoc-crm.org/cidoc-crm/E4_Period"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E13_Attribute_Assignment",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E13_Attribute_Assignment",
			"comment": "This class comprises the actions of making assertions about properties of an object or any relation between two items or concepts. \nThis class allows the documentation of how the respective assignment...",
			"size": "5.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"http://www.cidoc-crm.org/cidoc-crm/E16_Measurement",
			"http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"http://www.cidoc-crm.org/cidoc-crm/E14_Condition_Assessment",
			"http://www.cidoc-crm.org/cidoc-crm/E17_Type_Assignment"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E33_Linguistic_Object",
			"comment": "This class comprises identifiable expressions in natural language or languages. \nInstances of E33 Linguistic Object can be expressed in many ways: e.g. as written texts, recorded speech or sign langua...",
			"size": "2.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E35_Title",
			"http://www.cidoc-crm.org/cidoc-crm/E34_Inscription"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E69_Death",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E69_Death",
			"comment": "This class comprises the deaths of human beings. \nIf a person is killed, their death should be instantiated as E69 Death and as E7 Activity. The death or perishing of other living beings should be documented using E64 End of Existence.\n",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E45_Address",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E45_Address",
			"comment": "This class comprises identifiers expressed in coding systems for places, such as postal addresses used for mailing.\nAn E45 Address can be considered both as the name of an E53 Place and as an E51 Cont...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E16_Measurement",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E16_Measurement",
			"comment": "This class comprises actions measuring physical properties and other values that can be determined by a systematic procedure. \nExamples include measuring the monetary value of a collection of coins or...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E38_Image",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E38_Image",
			"comment": "This class comprises distributions of form, tone and colour that may be found on surfaces such as photos, paintings, prints and sculptures or directly on electronic media. \nThe degree to which variati...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E5_Event",
			"comment": "This class comprises changes of states in cultural, social or physical systems, regardless of scale, brought about by a series or group of coherent physical, cultural, technological or legal phenomena...",
			"size": "27.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E63_Beginning_of_Existence",
			"http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"http://www.cidoc-crm.org/cidoc-crm/E64_End_of_Existence"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "green",
			"label": "E53_Place",
			"comment": "This class comprises extents in space, in particular on the surface of the earth, in the pure sense of physics: independent from temporal phenomena and matter. \nThe instances of E53 Place are usually ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E89_Propositional_Object",
			"comment": "This class comprises immaterial items, including but not limited to stories, plots, procedural prescriptions, algorithms, laws of physics or images that are, or represent in some sense, sets of propos...",
			"size": "11.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E30_Right",
			"http://www.cidoc-crm.org/cidoc-crm/E73_Information_Object"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E66_Formation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E66_Formation",
			"comment": "This class comprises events that result in the formation of a formal or informal E74 Group of people, such as a club, society, association, corporation or nation. \nE66 Formation does not include the a...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E65_Creation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E65_Creation",
			"comment": "This class comprises events that result in the creation of conceptual items or immaterial products, such as legends, poems, texts, music, images, movies, laws, types etc.\n",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E83_Type_Creation"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E22_Man-Made_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E22_Man-Made_Object",
			"comment": "This class comprises physical objects purposely created by human activity.\nNo assumptions are made as to the extent of modification required to justify regarding an object as man-made. For example, an...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E84_Information_Carrier"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E56_Language",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "grey",
			"label": "E56_Language",
			"comment": "This class is a specialization of E55 Type and comprises the natural languages in the sense of concepts. \nThis type is used categorically in the model without reference to instances of it, i.e. the Mo...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E67_Birth",
			"comment": "This class comprises the births of human beings. E67 Birth is a biological event focussing on the context of people coming into life. (E63 Beginning of Existence comprises the coming into life of any ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E27_Site",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E27_Site",
			"comment": "This class comprises pieces of land or sea floor. \nIn contrast to the purely geometric notion of E53 Place, this class describes constellations of matter on the surface of the Earth or other celestial...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E44_Place_Appellation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E44_Place_Appellation",
			"comment": "This class comprises any sort of identifier characteristically used to refer to an E53 Place. \nInstances of E44 Place Appellation may vary in their degree of precision and their meaning may vary over ...",
			"size": "4.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E47_Spatial_Coordinates",
			"http://www.cidoc-crm.org/cidoc-crm/E45_Address",
			"http://www.cidoc-crm.org/cidoc-crm/E48_Place_Name",
			"http://www.cidoc-crm.org/cidoc-crm/E46_Section_Definition"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E37_Mark",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "yellow",
			"label": "E37_Mark",
			"comment": "This class comprises symbols, signs, signatures or short texts applied to instances of E24 Physical Man-Made Thing by arbitrary techniques in order to indicate the creator, owner, dedications, purpose...",
			"size": "1.0",
			"subclasses": "http://www.cidoc-crm.org/cidoc-crm/E34_Inscription"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "pink",
			"label": "E39_Actor",
			"comment": "This class comprises people, either individually or in groups, who have the potential to perform intentional actions of kinds for which someone may be held responsible.\nThe CRM does not attempt to mod...",
			"size": "3.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"http://www.cidoc-crm.org/cidoc-crm/E74_Group"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E68_Dissolution",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E68_Dissolution",
			"comment": "This class comprises the events that result in the formal or informal termination of an E74 Group of people. \nIf the dissolution was deliberate, the Dissolution event should also be instantiated as an E7 Activity.\n",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "grey",
			"label": "E55_Type",
			"comment": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of CRM classes. Instances of E55 Type represent concepts in contra...",
			"size": "3.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E58_Measurement_Unit",
			"http://www.cidoc-crm.org/cidoc-crm/E56_Language",
			"http://www.cidoc-crm.org/cidoc-crm/E57_Material"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "pink",
			"label": "E21_Person",
			"comment": "This class comprises real persons who live or are assumed to have lived. \nLegendary figures that may have existed, such as Ulysses and King Arthur, fall into this class if the documentation refers to ...",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E83_Type_Creation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "blue",
			"label": "E83_Type_Creation",
			"comment": "This class comprises activities formally defining new types of items. \nIt is typically a rigorous scholarly or scientific process that ensures a type is exhaustively described and appropriately named....",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "brown",
			"label": "E24_Physical_Man-Made_Thing",
			"comment": "This class comprises all persistent physical items that are purposely created by human activity.\nThis class comprises man-made objects, such as a swords, and man-made features, such as rock art. No as...",
			"size": "4.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E22_Man-Made_Object",
			"http://www.cidoc-crm.org/cidoc-crm/E78_Collection",
			"http://www.cidoc-crm.org/cidoc-crm/E25_Man-Made_Feature"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E75_Conceptual_Object_Appellation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "light_grey",
			"label": "E75_Conceptual_Object_Appellation",
			"comment": "This class comprises appellations that are by their form or syntax specific to identifying instances of E28 Conceptual Object, such as intellectual products, standardized patterns etc.",
			"size": "0.0"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/E72_Legal_Object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
                        "color": "white",
			"label": "E72_Legal_Object",
			"comment": "This class comprises those material or immaterial items to which instances of E30 Right, such as the right of ownership or use, can be applied. \nThis is true for all E18 Physical Thing. In the case of...",
			"size": "34.0",
			"subclasses": ["http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object"]
		}],
		"properties": [{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P12i_was_present_at",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P12i_was_present_at",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P93i_was_taken_out_of_existence_by",
			"http://www.cidoc-crm.org/cidoc-crm/P31i_was_modified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P11i_participated_in",
			"http://www.cidoc-crm.org/cidoc-crm/P111i_was_added_by",
			"http://www.cidoc-crm.org/cidoc-crm/P92i_was_brought_into_existence_by",
			"http://www.cidoc-crm.org/cidoc-crm/P25i_moved_by",
			"http://www.cidoc-crm.org/cidoc-crm/P113i_was_removed_by",
			"http://www.cidoc-crm.org/cidoc-crm/P16i_was_used_for"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P136i_supported_type_creation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P136i_supported_type_creation",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E83_Type_Creation",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P71i_is_listed_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P71i_is_listed_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E32_Authority_Document",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P93i_was_taken_out_of_existence_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P93i_was_taken_out_of_existence_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E64_End_of_Existence",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P13i_was_destroyed_by",
			"http://www.cidoc-crm.org/cidoc-crm/P100i_died_in",
			"http://www.cidoc-crm.org/cidoc-crm/P124i_was_transformed_by",
			"http://www.cidoc-crm.org/cidoc-crm/P99i_was_dissolved_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P137_exemplifies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P137_exemplifies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property allows an item to be declared as a particular example of an E55 Type or taxon\n\tThe P137.1 in the taxonomic role property of P137 exemplifies (is exemplified by) allows differentiation of..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P130_shows_features_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P130_shows_features_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"comment": "This property generalises the notions of \"copy of\" and \"similar to\" into a dynamic, asymmetric relationship, where the domain expresses the derivative, if such a direction can be established.\nOtherwi...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P73_has_translation",
			"http://www.cidoc-crm.org/cidoc-crm/P128_carries"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P17i_motivated",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P17i_motivated",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P39i_was_measured_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P39i_was_measured_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E16_Measurement",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P15i_influenced",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P15i_influenced",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P17i_motivated",
			"http://www.cidoc-crm.org/cidoc-crm/P136i_supported_type_creation",
			"http://www.cidoc-crm.org/cidoc-crm/P16i_was_used_for",
			"http://www.cidoc-crm.org/cidoc-crm/P134i_was_continued_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P16i_was_used_for",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P16i_was_used_for",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P142i_was_used_in",
			"http://www.cidoc-crm.org/cidoc-crm/P111i_was_added_by",
			"http://www.cidoc-crm.org/cidoc-crm/P33i_was_used_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P2_has_type",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P2_has_type",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property allows sub typing of CRM entities - a form of specialisation – through the use of a terminological hierarchy, or thesaurus. \nThe CRM is intended to focus on the high-level entities and r...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P137_exemplifies"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P141i_was_assigned_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P141i_was_assigned_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E13_Attribute_Assignment",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P37i_was_assigned_by",
			"http://www.cidoc-crm.org/cidoc-crm/P40i_was_observed_in",
			"http://www.cidoc-crm.org/cidoc-crm/P35i_was_identified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P155i_is_co-reference_target_of",
			"http://www.cidoc-crm.org/cidoc-crm/P38i_was_deassigned_by",
			"http://www.cidoc-crm.org/cidoc-crm/P42i_was_assigned_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P43_has_dimension",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"comment": "This property records a E54 Dimension of some E70 Thing.\nIt is a shortcut of the more fully developed path from E70 Thing through P39 measured (was measured by), E16 Measurement P40 observed dimension..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P67i_is_referred_to_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P71i_is_listed_in",
			"http://www.cidoc-crm.org/cidoc-crm/P138i_has_representation",
			"http://www.cidoc-crm.org/cidoc-crm/P68i_use_foreseen_by",
			"http://www.cidoc-crm.org/cidoc-crm/P129i_is_subject_of",
			"http://www.cidoc-crm.org/cidoc-crm/P70i_is_documented_in"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P124i_was_transformed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P124i_was_transformed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E81_Transformation",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P3_has_note",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P3_has_note",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property is a container for all informal descriptions about an object that have not been expressed in terms of CRM constructs. \nIn particular it captures the characterisation of the item itself, ...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P79_beginning_is_qualified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P80_end_is_qualified_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P140i_was_attributed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P140i_was_attributed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E13_Attribute_Assignment",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P154i_was_regarded_not_to_co-refer_by",
			"http://www.cidoc-crm.org/cidoc-crm/P34i_was_assessed_by",
			"http://www.cidoc-crm.org/cidoc-crm/P39i_was_measured_by",
			"http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P153i_was_regarded_to_co-refer_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P129i_is_subject_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P129i_is_subject_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P92i_was_brought_into_existence_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P92i_was_brought_into_existence_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E63_Beginning_of_Existence",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P95i_was_formed_by",
			"http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by",
			"http://www.cidoc-crm.org/cidoc-crm/P123i_resulted_from",
			"http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by",
			"http://www.cidoc-crm.org/cidoc-crm/P98i_was_born"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P138i_has_representation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P138i_has_representation",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E36_Visual_Item",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P48_has_preferred_identifier",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P48_has_preferred_identifier",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"comment": "This property records the preferred E42 Identifier that was used to identify an instance of E1 CRM Entity at the time this property was recorded.\nMore than one preferred identifier may have been assig..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P101_had_as_general_use",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P101_had_as_general_use",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property links an instance of E70 Thing to an E55 Type of usage.\nIt allows the relationship between particular things, both physical and immaterial, and general methods and techniques of use to b..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P130i_features_are_also_found_on",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P130i_features_are_also_found_on",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P128i_is_carried_by",
			"http://www.cidoc-crm.org/cidoc-crm/P73i_is_translation_of"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P70i_is_documented_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P70i_is_documented_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E31_Document",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P41i_was_classified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E17_Type_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P155i_is_co-reference_target_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P155i_is_co-reference_target_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P62i_is_depicted_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P62i_is_depicted_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P123i_resulted_from",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P123i_resulted_from",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E81_Transformation",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P1_is_identified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P1_is_identified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E41_Appellation",
			"comment": "This property describes the naming or identification of any real world item by a name or any other identifier. \nThis property is intended for identifiers in general use, which form part of the world t...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P102_has_title",
			"http://www.cidoc-crm.org/cidoc-crm/P48_has_preferred_identifier",
			"http://www.cidoc-crm.org/cidoc-crm/P131_is_identified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P149_is_identified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P87_is_identified_by",
			"http://www.cidoc-crm.org/cidoc-crm/P78_is_identified_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P132_overlaps_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P132_overlaps_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": "This symmetric property allows instances of E4 Period that overlap both temporally and spatially to be related, i,e. they share some spatio-temporal extent.\nThis property does not imply any ordering o..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P115i_is_finished_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P115i_is_finished_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P30_transferred_custody_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P30_transferred_custody_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property identifies an item or items of E18 Physical Thing concerned in an E10 Transfer of Custody activity. \nThe property will typically describe the object that is handed over by an E39 Actor t..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P119i_is_met_in_time_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P119i_is_met_in_time_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P119_meets_in_time_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P119_meets_in_time_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This property indicates that one E2 Temporal Entity immediately follows another. \nIt implies a particular order between the two entities: if A meets in time with B, then A must precede B. This propert..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P8_took_place_on_or_within",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P8_took_place_on_or_within",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing ",
			"comment": "This property describes the location of an instance of E4 Period with respect to an E18 Physical Thing.\nP8 took place on or within (witnessed) is a short-cut of a path defining a E53 Place with respec..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P134_continued",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P134_continued",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": "This property associates two instances of E7 Activity, where the domain is considered as an intentional continuation of the range. A continuation of an activity may happen when the continued activity ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P12_occurred_in_the_presence_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P12_occurred_in_the_presence_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"comment": "This property describes the active or passive presence of an E77 Persistent Item in an E5 Event without implying any specific role. \nIt connects the history of a thing with the E53 Place and E50 Date ...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P111_added",
			"http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object",
			"http://www.cidoc-crm.org/cidoc-crm/P113_removed",
			"http://www.cidoc-crm.org/cidoc-crm/P31_has_modified",
			"http://www.cidoc-crm.org/cidoc-crm/P92_brought_into_existence",
			"http://www.cidoc-crm.org/cidoc-crm/P25_moved",
			"http://www.cidoc-crm.org/cidoc-crm/P11_had_participant",
			"http://www.cidoc-crm.org/cidoc-crm/P93_took_out_of_existence"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P29_custody_received_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P29_custody_received_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor or Actors who receive custody of an instance of E18 Physical Thing in an E10 Transfer of Custody activity. \nThe property will typically describe Actors receiving..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P117_occurs_during",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P117_occurs_during",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This property allows the entire E52 Time-Span of an E2 Temporal Entity to be situated within the Time-Span of another temporal entity that starts before and ends after the included temporal entity. ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P117i_includes",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P117i_includes",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P19_was_intended_use_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P19_was_intended_use_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"comment": "This property relates an E7 Activity with objects created specifically for use in the activity. \nThis is distinct from the intended use of an item in some general type of activity such as the book of ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P11_had_participant",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P11_had_participant",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property describes the active or passive participation of instances of E39 Actors in an E5 Event. \nIt connects the life-line of the related E39 Actor with the E53 Place and E50 Date of the event....",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by",
			"http://www.cidoc-crm.org/cidoc-crm/P144_joined_with",
			"http://www.cidoc-crm.org/cidoc-crm/P143_joined",
			"http://www.cidoc-crm.org/cidoc-crm/P99_dissolved",
			"http://www.cidoc-crm.org/cidoc-crm/P151_was_formed_from",
			"http://www.cidoc-crm.org/cidoc-crm/P146_separated_from",
			"http://www.cidoc-crm.org/cidoc-crm/P145_separated",
			"http://www.cidoc-crm.org/cidoc-crm/P96_by_mother"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P4_has_time-span",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": "This property describes the temporal confinement of an instance of an E2 Temporal Entity.\nThe related E52 Time-Span is understood as the real Time-Span during which the phenomena were active, which ma..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P116_starts",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P116_starts",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This property allows the starting point for a E2 Temporal Entity to be situated by reference to the starting point of another temporal entity of longer duration. \nThis property is only necessary if t..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P20i_was_purpose_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P20i_was_purpose_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P10_falls_within",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P10_falls_within",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": "This property describes an instance of E4 Period, which falls within the E53 Place and E52 Time-Span of another. \nThe difference with P9 consists of (forms part of) is subtle. Unlike P9 consists of (f..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P7_took_place_at",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property describes the spatial location of an instance of E4 Period. \nThe related E53 Place should be seen as an approximation of the geographical area within which the phenomena that characteris...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P26_moved_to",
			"http://www.cidoc-crm.org/cidoc-crm/P27_moved_from"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P20_had_specific_purpose",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P20_had_specific_purpose",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"comment": "This property identifies the relationship between a preparatory activity and the event it is intended to be preparation for.\nThis includes activities, orders and other organisational actions, taken in..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P15_was_influenced_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P15_was_influenced_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This is a high level property, which captures the relationship between an E7 Activity and anything that may have had some bearing upon it.\nThe property has more specific sub properties.\n",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P17_was_motivated_by",
			"http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object",
			"http://www.cidoc-crm.org/cidoc-crm/P134_continued",
			"http://www.cidoc-crm.org/cidoc-crm/P136_was_based_on"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P10i_contains",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P10i_contains",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P9_consists_of"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P32_used_general_technique",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property identifies the technique or method that was employed in an activity.\nThese techniques should be drawn from an external E55 Type hierarchy of consistent terminology of general techniques ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P120_occurs_before",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P120_occurs_before",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This property identifies the relative chronological sequence of two temporal entities. \nIt implies that a temporal gap exists between the end of A and the start of B. This property is only necessary i..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P28_custody_surrendered_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P28_custody_surrendered_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor or Actors who surrender custody of an instance of E18 Physical Thing in an E10 Transfer of Custody activity. \nThe property will typically describe an Actor surre..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P133_is_separated_from",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P133_is_separated_from",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": "This symmetric property allows instances of E4 Period that do not overlap both temporally and spatially, to be related i,e. they do not share any spatio-temporal extent.\nThis property does not imply a..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P17_was_motivated_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P17_was_motivated_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property describes an item or items that are regarded as a reason for carrying out the E7 Activity. \nFor example, the discovery of a large hoard of treasure may call for a celebration, an order f..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P116i_is_started_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P116i_is_started_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P114_is_equal_in_time_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P114_is_equal_in_time_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This symmetric property allows the instances of E2 Temporal Entity with the same E52 Time-Span to be equated. \nThis property is only necessary if the time span is unknown (otherwise the equivalence ca..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P33_used_specific_technique",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P33_used_specific_technique",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"comment": "This property identifies a specific instance of E29 Design or Procedure in order to carry out an instance of E7 Activity or parts of it. \nThe property differs from P32 used general technique (was tech..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P118i_is_overlapped_in_time_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P118i_is_overlapped_in_time_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P120i_occurs_after",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P120i_occurs_after",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P9i_forms_part_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P9i_forms_part_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P125_used_object_of_type",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P125_used_object_of_type",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property defines the kind of objects used in an E7 Activity, when the specific instance is either unknown or not of interest, such as use of \"a hammer\".\n",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P118_overlaps_in_time_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P118_overlaps_in_time_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This property identifies an overlap between the instances of E52 Time-Span of two instances of E2 Temporal Entity. \nIt implies a temporal order between the two entities: if A overlaps in time B, then ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P21_had_general_purpose",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P21_had_general_purpose",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property describes an intentional relationship between an E7 Activity and some general goal or purpose. \nThis may involve activities intended as preparation for some type of activity or event. P2..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P134i_was_continued_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P134i_was_continued_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P158_occupied",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P158_occupied",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E92_Spacetime_Volume",
			"comment": "This property associates an instance of E4 Period with the real that is phenomenal, 4 dimensional point set or volume in spacetime that it has occupied. The associated instance of E92 Spacetime Volume..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P16_used_specific_object",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"comment": "This property describes the use of material or immaterial things in a way essential to the performance or the outcome of an E7 Activity. \nThis property typically applies to tools, instruments, moulds,...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P111_added",
			"http://www.cidoc-crm.org/cidoc-crm/P33_used_specific_technique",
			"http://www.cidoc-crm.org/cidoc-crm/P142_used_constituent"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P14_carried_out_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property describes the active participation of an E39 Actor in an E7 Activity. \nIt implies causal or legal responsibility. The P14.1 in the role of property of the property allows the nature of a...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P22_transferred_title_to",
			"http://www.cidoc-crm.org/cidoc-crm/P29_custody_received_by",
			"http://www.cidoc-crm.org/cidoc-crm/P23_transferred_title_from",
			"http://www.cidoc-crm.org/cidoc-crm/P28_custody_surrendered_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P9_consists_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P9_consists_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": "This property associates an instance of E4 Period with another instance of E4 Period that falls within the spacetime volumes occupied by the former and which is defined by phenomena that form part of ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P115_finishes",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P115_finishes",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": "This property allows the ending point for a E2 Temporal Entity to be situated by reference to the ending point of another temporal entity of longer duration. \nThis property is only necessary if the t..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P94i_was_created_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E28_Conceptual_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E65_Creation",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P135i_was_created_by"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P33i_was_used_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P33i_was_used_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P106_is_composed_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P106_is_composed_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"comment": "This property associates an instance of E90 Symbolic Object with a part of it that is by itself an instance of E90 Symbolic Object, such as fragments of texts or clippings from an image.\n",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P165_incorporates"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P129_is_about",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P129_is_about",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property documents that an E89 Propositional Object has as subject an instance of E1 CRM Entity. \n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P104_is_subject_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P104_is_subject_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E72_Legal_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E30_Right",
			"comment": "This property links a particular E72 Legal Object to the instances of E30 Right to which it is subject.\nThe Right is held by an E39 Actor as described by P75 possesses (is possessed by).\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P105_right_held_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P105_right_held_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E72_Legal_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor who holds the instances of E30 Right to an E72 Legal Object.\n\tIt is a superproperty of P52 has current owner (is current owner of) because ownership is a right t...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P52_has_current_owner"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P103_was_intended_for",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P103_was_intended_for",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property links an instance of E71 Man-Made Thing to an E55 Type of usage. \nIt creates a property between specific man-made things, both physical and immaterial, to Types of intended methods and t..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P67_refers_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P67_refers_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property documents that an E89 Propositional Object makes a statement about an instance of E1 CRM Entity. P67 refers to (is referred to by) has the P67.1 has type link to an instance of E55 Type....",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P71_lists",
			"http://www.cidoc-crm.org/cidoc-crm/P129_is_about",
			"http://www.cidoc-crm.org/cidoc-crm/P70_documents",
			"http://www.cidoc-crm.org/cidoc-crm/P68_foresees_use_of",
			"http://www.cidoc-crm.org/cidoc-crm/P138_represents"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P148_has_component",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P148_has_component",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"comment": "This property associates an instance of E89 Propositional Object with a structural part of it that is by itself an instance of E89 Propositional Object."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P102_has_title",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P102_has_title",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E35_Title",
			"comment": "This property describes the E35 Title applied to an instance of E71 Man-Made Thing. The E55 Type of Title is assigned in a sub property.\nThe P102.1 has type property of the P102 has title (is title of..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P165_incorporates",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P165_incorporates",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E73_Information_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"comment": "This property associates an instance of E73 Information Object with an instance of E90 Symbolic Object (or any of its subclasses) that was included in it. This property makes it possible to recognise ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P149_is_identified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P149_is_identified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E28_Conceptual_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E75_Conceptual_Object_Appellation",
			"comment": "This property identifies an instance of E28 Conceptual Object using an instance of E75 Conceptual Object Appellation."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P142i_was_used_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P142i_was_used_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P154i_was_regarded_not_to_co-refer_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P154i_was_regarded_not_to_co-refer_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P153i_was_regarded_to_co-refer_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P153i_was_regarded_to_co-refer_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P106i_forms_part_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P106i_forms_part_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P165i_is_incorporated_in"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P128i_is_carried_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P128i_is_carried_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P65i_is_shown_by"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P68_foresees_use_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P68_foresees_use_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"comment": "This property identifies an E57 Material foreseeen to be used by an E29 Design or Procedure. \nE29 Designs and procedures commonly foresee the use of particular E57 Materials. The fabrication of adobe ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P148i_is_component_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P148i_is_component_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P69_is_associated_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P69_is_associated_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"comment": "This property generalises relationships like whole-part, sequence, prerequisite or inspired by between instances of E29 Design or Procedure. Any instance of E29 Design or Procedure may be associated w..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P165i_is_incorporated_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P165i_is_incorporated_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E73_Information_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P19i_was_made_for",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P19i_was_made_for",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P62_depicts",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P62_depicts",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property identifies something that is depicted by an instance of E24 Physical Man-Made Thing.\nThis property is a shortcut of the more fully developed path from E24 Physical Man-Made Thing through..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P56_bears_feature",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P56_bears_feature",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E26_Physical_Feature",
			"comment": "This property links an instance of E19 Physical Object to an instance of E26 Physical Feature that it bears.\nAn E26 Physical Feature can only exist on one object. One object may bear more than one E26..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P45_consists_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P45_consists_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"comment": "This property identifies the instances of E57 Materials of which an instance of E18 Physical Thing is composed.\nAll physical things consist of physical materials. P45 consists of (is incorporated in) ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P24i_changed_ownership_through",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P24i_changed_ownership_through",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P30i_custody_transferred_through",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P30i_custody_transferred_through",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P58_has_section_definition",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P58_has_section_definition",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E46_Section_Definition",
			"comment": "This property links an area (section) named by a E46 Section Definition to the instance of E18 Physical Thing upon which it is found.\nThe CRM handles sections as locations (instances of E53 Place) wit..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P113i_was_removed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P113i_was_removed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E80_Part_Removal",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P57_has_number_of_parts",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P57_has_number_of_parts",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property documents the E60 Number of parts of which an instance of E19 Physical Object is composed.\nThis may be used as a method of checking inventory counts with regard to aggregate or collectiv..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P65_shows_visual_item",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P65_shows_visual_item",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E36_Visual_Item",
			"comment": "This property documents an E36 Visual Item shown by an instance of E24 Physical Man-Made Thing.\nThis property is similar to P62 depicts (is depicted by) in that it associates an item of E24 Physical M..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P112i_was_diminished_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P112i_was_diminished_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E80_Part_Removal",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P52_has_current_owner",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P52_has_current_owner",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E21 Person, E74 Group or E40 Legal Body that was the owner of an instance of E18 Physical Thing at the time of validity of the record or database containing the statement ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P44_has_condition",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P44_has_condition",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"comment": "This property records an E3 Condition State for some E18 Physical Thing.\nIt is a shortcut of the more fully developed path from E18 Physical Thing through P34 concerned (was assessed by), E14 Conditio..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P156_occupies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P156_occupies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property describes the maximal real volume in space that an instance of E18 Physical Thing has occupied during its lifetime with respect to a reference space relative to which the thing is at res..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P50_has_current_keeper",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P50_has_current_keeper",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor or Actors who had custody of an instance of E18 Physical Thing at the time of validity of the record or database containing the statement that uses this property..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P25i_moved_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P25i_moved_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P51_has_former_or_current_owner",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P51_has_former_or_current_owner",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor that is or has been the legal owner (i.e. title holder) of an instance of E18 Physical Thing at some time.\nThe distinction with P52 has current owner (is current...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P52_has_current_owner"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P46_is_composed_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property allows instances of E18 Physical Thing to be analysed into component elements.\nComponent elements, since they are themselves instances of E18 Physical Thing, may be further analysed into...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P56_bears_feature"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P55_has_current_location",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P55_has_current_location",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property records the location of an E19 Physical Object at the time of validity of the record or database containing the statement that uses this property. \n\tThis property is a specialisation of ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P54_has_current_permanent_location",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P54_has_current_permanent_location",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property records the foreseen permanent location of an instance of E19 Physical Object at the time of validity of the record or database containing the statement that uses this property.\nP54 has ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P8i_witnessed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P8i_witnessed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P59_has_section",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P59_has_section",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property links an area to the instance of E18 Physical Thing upon which it is found.\nIt is typically used when a named E46 Section Definition is not appropriate.\nE18 Physical Thing may be subdivi...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P157i_provides_reference_space_for"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P110i_was_augmented_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P110i_was_augmented_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E79_Part_Addition",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P31i_was_modified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P31i_was_modified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E11_Modification",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P112i_was_diminished_by",
			"http://www.cidoc-crm.org/cidoc-crm/P110i_was_augmented_by",
			"http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P111i_was_added_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P111i_was_added_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E79_Part_Addition",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P53_has_former_or_current_location",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P53_has_former_or_current_location",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property allows an instance of E53 Place to be associated as the former or current location of an instance of E18 Physical Thing.\nIn the case of E19 Physical Objects, the property does not allow ...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P55_has_current_location"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P157i_provides_reference_space_for",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P157i_provides_reference_space_for",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P108i_was_produced_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E12_Production",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P49_has_former_or_current_keeper",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P49_has_former_or_current_keeper",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor or Actors who have or have had custody of an instance of E18 Physical Thing at some time. \nThe distinction with P50 has current keeper (is current keeper of) is ...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P109_has_current_or_former_curator",
			"http://www.cidoc-crm.org/cidoc-crm/P50_has_current_keeper"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P13i_was_destroyed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P13i_was_destroyed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E6_Destruction",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P159_occupied",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P159_occupied",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E92_Spacetime_Volume",
			"comment": "This property describes the real that is (phenomenal), 4 dimensional point sets or volumes in spacetime that the trajectory of an instance of E18 Physical Thing occupies in the course of its existence..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P128_carries",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P128_carries",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"comment": "This property identifies an E90 Symbolic Object carried by an instance of E18 Physical Thing.\n",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P65_shows_visual_item"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P34i_was_assessed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P34i_was_assessed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E14_Condition_Assessment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P46i_forms_part_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P46i_forms_part_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P56i_is_found_on"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P70_documents",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P70_documents",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E31_Document",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property describes the CRM Entities documented by instances of E31 Document.\nDocuments may describe any conceivable entity, hence the link to the highest-level entity in the CRM hierarchy. This p..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P31_has_modified",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P31_has_modified",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E11_Modification",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"comment": "This property identifies the E24 Physical Man-Made Thing modified in an E11 Modification.\nIf a modification is applied to a non-man-made object, it is regarded as an E22 Man-Made Object from that time...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P108_has_produced",
			"http://www.cidoc-crm.org/cidoc-crm/P112_diminished",
			"http://www.cidoc-crm.org/cidoc-crm/P110_augmented"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P126_employed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P126_employed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E11_Modification",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"comment": "This property identifies E57 Material employed in an E11 Modification.\nThe E57 Material used during the E11 Modification does not necessarily become incorporated into the E24 Physical Man-Made Thing t..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P150_defines_typical_parts_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P150_defines_typical_parts_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "The property \"broaderPartitive\" associates an instance of E55 Type “A” with an instance of E55 Type “B”, when items of type “A” typically form part of items of type “B”, such as “car motors” and “cars..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P127i_has_narrower_term",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P127i_has_narrower_term",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P137i_is_exemplified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P137i_is_exemplified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P91i_is_unit_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P91i_is_unit_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E58_Measurement_Unit",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P135i_was_created_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P135i_was_created_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E83_Type_Creation",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P42i_was_assigned_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P42i_was_assigned_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E17_Type_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P2i_is_type_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P2i_is_type_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P137i_is_exemplified_by"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P150i_defines_typical_wholes_for",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P150i_defines_typical_wholes_for",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P127_has_broader_term",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P127_has_broader_term",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property identifies a super-Type to which an E55 Type is related. \n\t\tIt allows Types to be organised into hierarchies. This is the sense of \"broader term generic \t\t(BTG)\" as defined in ISO 2788\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P125i_was_type_of_object_used_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P125i_was_type_of_object_used_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P32i_was_technique_of"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P21i_was_purpose_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P21i_was_purpose_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P32i_was_technique_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P32i_was_technique_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P103i_was_intention_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P103i_was_intention_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P101i_was_use_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P101i_was_use_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P13_destroyed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P13_destroyed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E6_Destruction",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property allows specific instances of E18 Physical Thing that have been destroyed to be related to a destruction event. \nDestruction implies the end of an item’s life as a subject of cultural doc..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P93_took_out_of_existence",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P93_took_out_of_existence",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E64_End_of_Existence",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"comment": "This property allows an E64 End of Existence event to be linked to the E77 Persistent Item taken out of existence by it.\nIn the case of immaterial things, the E64 End of Existence is considered to tak...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P124_transformed",
			"http://www.cidoc-crm.org/cidoc-crm/P13_destroyed",
			"http://www.cidoc-crm.org/cidoc-crm/P100_was_death_of",
			"http://www.cidoc-crm.org/cidoc-crm/P99_dissolved"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P56i_is_found_on",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P56i_is_found_on",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E26_Physical_Feature",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P81b_begin_of_the_end",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P81b_begin_of_the_end",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2001/XMLSchema#dateTime",
			"comment": "This is defined as the second boundary of the property P81"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P82_at_some_time_within",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P82_at_some_time_within",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property describes the maximum period of time within which an E52 Time-Span falls.\nSince Time-Spans may not have precisely known temporal extents, the CRM supports statements about the minimum an...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P82a_begin_of_the_begin",
			"http://www.cidoc-crm.org/cidoc-crm/P82b_end_of_the_end"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P86i_contains",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P86i_contains",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P84_had_at_most_duration",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P84_had_at_most_duration",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"comment": "This property describes the maximum length of time covered by an E52 Time-Span. \nIt allows an E52 Time-Span to be associated with an E54 Dimension representing it’s maximum duration (i.e. it’s outer b..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P78_is_identified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P78_is_identified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E49_Time_Appellation",
			"comment": "This property identifies an E52 Time-Span using an E49Time Appellation."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P79_beginning_is_qualified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P79_beginning_is_qualified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property qualifies the beginning of an E52 Time-Span in some way. \nThe nature of the qualification may be certainty, precision, source etc.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P80_end_is_qualified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P80_end_is_qualified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property qualifies the end of an E52 Time-Span in some way. \nThe nature of the qualification may be certainty, precision, source etc.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P83_had_at_least_duration",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P83_had_at_least_duration",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"comment": "This property describes the minimum length of time covered by an E52 Time-Span. \nIt allows an E52 Time-Span to be associated with an E54 Dimension representing it’s minimum duration (i.e. it’s inner b..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P4i_is_time-span_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P4i_is_time-span_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E2_Temporal_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P82b_end_of_the_end",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P82b_end_of_the_end",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2001/XMLSchema#dateTime",
			"comment": "This is defined as the second boundary of the property P82"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P81_ongoing_throughout",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P81_ongoing_throughout",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property describes the minimum period of time covered by an E52 Time-Span.\nSince Time-Spans may not have precisely known temporal extents, the CRM supports statements about the minimum and maximu...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P81a_end_of_the_begin",
			"http://www.cidoc-crm.org/cidoc-crm/P81b_begin_of_the_end"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P81a_end_of_the_begin",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P81a_end_of_the_begin",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2001/XMLSchema#dateTime",
			"comment": "This is defined as the first boundary of the property P81"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P86_falls_within",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P86_falls_within",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": "This property describes the inclusion relationship between two instances of E52 Time-Span.\nThis property supports the notion that a Time-Span’s temporal extent falls within the temporal extent of anot..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P82a_begin_of_the_begin",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P82a_begin_of_the_begin",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"range": "http://www.w3.org/2001/XMLSchema#dateTime",
			"comment": "This is defined as the first boundary of the property P82"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P161_has_spatial_projection",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P161_has_spatial_projection",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E92_Spacetime_Volume",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property associates an instance of a E92 Spacetime Volume with an instance of E53 Place that is the result of the spatial projection of the instance of a E92 Spacetime Volume on a reference space..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P164_is_restricted_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P164_is_restricted_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E93_Spacetime_Snapshot",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": "This property relates an E93 Spacetime Snapshot with an arbitrary E52 Time-Span that restricts the extent of the former to a volume within these time limits.\n\t"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P160_has_temporal_projection",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P160_has_temporal_projection",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E92_Spacetime_Volume",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": "This property describes the temporal projection of an instance of an E92 Spacetime Volume. The property P4 has time-span is a shortcut of the more fully developed path from E4 Period through P158 occu..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P113_removed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P113_removed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E80_Part_Removal",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property identifies the E18 Physical Thing that is removed during an E80 Part Removal activity."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P112_diminished",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P112_diminished",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E80_Part_Removal",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"comment": "This property identifies the E24 Physical Man-Made Thing that was diminished by E80 Part Removal.\nAlthough a Part removal activity normally concerns only one item of Physical Man-Made Thing, it is pos..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P147_curated",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P147_curated",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E87_Curation_Activity",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E78_Collection",
			"comment": "This property associates an instance of E87 Curation Activity with the instance of E78 Collection that is subject of that curation activity.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P71_lists",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P71_lists",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E32_Authority_Document",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property documents a source E32 Authority Document for an instance of an E1 CRM Entity.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P139_has_alternative_form",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P139_has_alternative_form",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E41_Appellation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E41_Appellation",
			"comment": "This property establishes a relationship of equivalence between two instances of E41 Appellation independent from any item identified by them. It is a dynamic asymmetric relationship, where the range ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P1i_identifies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P1i_identifies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E41_Appellation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P131i_identifies",
			"http://www.cidoc-crm.org/cidoc-crm/P78i_identifies",
			"http://www.cidoc-crm.org/cidoc-crm/P87i_identifies",
			"http://www.cidoc-crm.org/cidoc-crm/P48i_is_preferred_identifier_of",
			"http://www.cidoc-crm.org/cidoc-crm/P102i_is_title_of",
			"http://www.cidoc-crm.org/cidoc-crm/P149i_identifies"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P92_brought_into_existence",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P92_brought_into_existence",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E63_Beginning_of_Existence",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"comment": "This property allows an E63 Beginning of Existence event to be linked to the E77 Persistent Item brought into existence by it.\nIt allows a “start” to be attached to any Persistent Item being documente...",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P98_brought_into_life",
			"http://www.cidoc-crm.org/cidoc-crm/P94_has_created",
			"http://www.cidoc-crm.org/cidoc-crm/P108_has_produced",
			"http://www.cidoc-crm.org/cidoc-crm/P95_has_formed",
			"http://www.cidoc-crm.org/cidoc-crm/P123_resulted_in"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P108_has_produced",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P108_has_produced",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E12_Production",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"comment": "This property identifies the E24 Physical Man-Made Thing that came into existence as a result of an E12 Production.\nThe identity of an instance of E24 Physical Man-Made Thing is not defined by its mat..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P73_has_translation",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P73_has_translation",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"comment": "This property describes the source and target of instances of E33Linguistic Object involved in a translation.\nWhen a Linguistic Object is translated into a new language it becomes a new Linguistic Obj..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P138_represents",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P138_represents",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E36_Visual_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property establishes the relationship between an E36 Visual Item and the entity that it visually represents.\nAny entity may be represented visually. This property is part of the fully developed p..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P65i_is_shown_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P65i_is_shown_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E36_Visual_Item",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P73i_is_translation_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P73i_is_translation_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P72_has_language",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P72_has_language",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E56_Language",
			"comment": "This property describes the E56 Language of an E33 Linguistic Object. \nLinguistic Objects are composed in one or more human Languages. This property allows these languages to be documented.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P147i_was_curated_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P147i_was_curated_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E78_Collection",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E87_Curation_Activity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P109_has_current_or_former_curator",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P109_has_current_or_former_curator",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E78_Collection",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor or Actors who assume or have assumed overall curatorial responsibility for an E78 Collection.\nThis property is effectively a short-cut. It does not allow a histo..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P76i_provides_access_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P76i_provides_access_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E51_Contact_Point",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P131i_identifies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P131i_identifies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E82_Actor_Appellation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P24_transferred_title_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P24_transferred_title_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property identifies the E18 Physical Thing or things involved in an E8 Acquisition. \nIn reality, an acquisition must refer to at least one transferred item.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P22_transferred_title_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P22_transferred_title_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor that acquires the legal ownership of an object as a result of an E8 Acquisition. \nThe property will typically describe an Actor purchasing or otherwise acquiring..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P23_transferred_title_from",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P23_transferred_title_from",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the E39 Actor or Actors who relinquish legal ownership as the result of an E8 Acquisition.\nThe property will typically be used to describe a person donating or selling an obje..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P145_separated",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P145_separated",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E86_Leaving",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the instance of E39 Actor that leaves an instance of E74 Group through an instance of E86 Leaving."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P146_separated_from",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P146_separated_from",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E86_Leaving",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"comment": "This property identifies the instance of E74 Group an instance of E39 Actor leaves through an instance of E86 Leaving.\nAlthough a Leaving activity normally concerns only one instance of E74 Group, it ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P145i_left_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P145i_left_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E86_Leaving",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P99i_was_dissolved_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P99i_was_dissolved_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E68_Dissolution",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P143i_was_joined_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P143i_was_joined_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E85_Joining",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P14i_performed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P14i_performed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E7_Activity",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P23i_surrendered_title_through",
			"http://www.cidoc-crm.org/cidoc-crm/P22i_acquired_title_through",
			"http://www.cidoc-crm.org/cidoc-crm/P28i_surrendered_custody_through",
			"http://www.cidoc-crm.org/cidoc-crm/P29i_received_custody_through"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P95i_was_formed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P95i_was_formed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E66_Formation",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P131_is_identified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P131_is_identified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E82_Actor_Appellation",
			"comment": "This property identifies a name used specifically to identify an E39 Actor. \nThis property is a specialisation of P1 is identified by (identifies) is identified by.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P28i_surrendered_custody_through",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P28i_surrendered_custody_through",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P22i_acquired_title_through",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P22i_acquired_title_through",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P107i_is_current_or_former_member_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P107i_is_current_or_former_member_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P29i_received_custody_through",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P29i_received_custody_through",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E10_Transfer_of_Custody",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P76_has_contact_point",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P76_has_contact_point",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E51_Contact_Point",
			"comment": "This property identifies an E51 Contact Point of any type that provides access to an E39 Actor by any communication method, such as e-mail or fax.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P11i_participated_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P11i_participated_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E5_Event",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P146i_lost_member_by",
			"http://www.cidoc-crm.org/cidoc-crm/P143i_was_joined_by",
			"http://www.cidoc-crm.org/cidoc-crm/P144i_gained_member_by",
			"http://www.cidoc-crm.org/cidoc-crm/P96i_gave_birth",
			"http://www.cidoc-crm.org/cidoc-crm/P151i_participated_in",
			"http://www.cidoc-crm.org/cidoc-crm/P145i_left_by",
			"http://www.cidoc-crm.org/cidoc-crm/P99i_was_dissolved_by",
			"http://www.cidoc-crm.org/cidoc-crm/P14i_performed"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P50i_is_current_keeper_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P50i_is_current_keeper_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P146i_lost_member_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P146i_lost_member_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E86_Leaving",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P144i_gained_member_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P144i_gained_member_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E85_Joining",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P151i_participated_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P151i_participated_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E66_Formation",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P74_has_current_or_former_residence",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P74_has_current_or_former_residence",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property describes the current or former E53 Place of residence of an E39 Actor. \nThe residence may be either the Place where the Actor resides, or a legally registered address of any kind.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P52i_is_current_owner_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P52i_is_current_owner_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P51i_is_former_or_current_owner_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P51i_is_former_or_current_owner_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P52i_is_current_owner_of"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P49i_is_former_or_current_keeper_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P49i_is_former_or_current_keeper_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P109i_is_current_or_former_curator_of",
			"http://www.cidoc-crm.org/cidoc-crm/P50i_is_current_keeper_of"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P23i_surrendered_title_through",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P23i_surrendered_title_through",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E8_Acquisition",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P109i_is_current_or_former_curator_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P109i_is_current_or_former_curator_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E78_Collection",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P105i_has_right_on",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P105i_has_right_on",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E72_Legal_Object",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P52i_is_current_owner_of"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P107_has_current_or_former_member",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P107_has_current_or_former_member",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property relates an E39 Actor to the E74 Group of which that E39 Actor is a member.\nGroups, Legal Bodies and Persons, may all be members of Groups. A Group necessarily consists of more than one m..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P75_possesses",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P75_possesses",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E30_Right",
			"comment": "This property identifies former or current instances of E30 Rights held by an E39 Actor."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P140_assigned_attribute_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P140_assigned_attribute_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E13_Attribute_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property indicates the item to which an attribute or relation is assigned. ",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P39_measured",
			"http://www.cidoc-crm.org/cidoc-crm/P34_concerned",
			"http://www.cidoc-crm.org/cidoc-crm/P41_classified",
			"http://www.cidoc-crm.org/cidoc-crm/P154_assigned_non_co-reference_to",
			"http://www.cidoc-crm.org/cidoc-crm/P153_assigned_co-reference_to"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P42_assigned",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P42_assigned",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E17_Type_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property records the type that was assigned to an entity by an E17 Type Assignment activity. \nType assignment events allow a more detailed path from E1 CRM Entity through P41 classified (was clas..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P141_assigned",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P141_assigned",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E13_Attribute_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property indicates the attribute that was assigned or the item that was related to the item denoted by a property P140 assigned attribute to in an Attribute assignment action.\n",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P42_assigned",
			"http://www.cidoc-crm.org/cidoc-crm/P37_assigned",
			"http://www.cidoc-crm.org/cidoc-crm/P35_has_identified",
			"http://www.cidoc-crm.org/cidoc-crm/P40_observed_dimension",
			"http://www.cidoc-crm.org/cidoc-crm/P155_has_co-reference_target",
			"http://www.cidoc-crm.org/cidoc-crm/P38_deassigned"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P41_classified",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P41_classified",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E17_Type_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property records the item to which a type was assigned in an E17 Type Assignment activity.\nAny instance of a CRM entity may be assigned a type through type assignment. Type assignment events allo..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P102i_is_title_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P102i_is_title_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E35_Title",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E71_Man-Made_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P123_resulted_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P123_resulted_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E81_Transformation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"comment": "This property identifies the E77 Persistent Item or items that are the result of an E81 Transformation. \nNew items replace the transformed item or items, which cease to exist as units of documentation..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P124_transformed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P124_transformed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E81_Transformation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E77_Persistent_Item",
			"comment": "This property identifies the E77 Persistent Item or items that cease to exist due to a E81 Transformation. \nIt is replaced by the result of the Transformation, which becomes a new unit of documentatio..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P26_moved_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P26_moved_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property identifies the destination of a E9 Move. \nA move will be linked to a destination, such as the move of an artefact from storage to display. A move may be linked to many terminal instances..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P25_moved",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P25_moved",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"comment": "This property identifies the E19 Physical Object that is moved during a move event. \nThe property implies the object’s passive participation. For example, Monet’s painting “Impression sunrise” was mov..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P27_moved_from",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P27_moved_from",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property identifies the starting E53 Place of an E9 Move.\nA move will be linked to an origin, such as the move of an artefact from storage to display. A move may be linked to many origins. In thi..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P78i_identifies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P78i_identifies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E49_Time_Appellation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P35_has_identified",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P35_has_identified",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E14_Condition_Assessment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"comment": "This property identifies the E3 Condition State that was observed in an E14 Condition Assessment activity."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P34_concerned",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P34_concerned",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E14_Condition_Assessment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property identifies the E18 Physical Thing that was assessed during an E14 Condition Assessment activity. \nConditions may be assessed either by direct observation or using recorded evidence. In t..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P68i_use_foreseen_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P68i_use_foreseen_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E29_Design_or_Procedure",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P126i_was_employed_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P126i_was_employed_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E11_Modification",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P45i_is_incorporated_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P45i_is_incorporated_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E57_Material",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P87i_identifies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P87i_identifies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E44_Place_Appellation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P111_added",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P111_added",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E79_Part_Addition",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property identifies the E18 Physical Thing that is added during an E79 Part Addition activity\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P110_augmented",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P110_augmented",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E79_Part_Addition",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E24_Physical_Man-Made_Thing",
			"comment": "This property identifies the E24 Physical Man-Made Thing that is added to (augmented) in an E79 Part Addition.\nAlthough a Part Addition event normally concerns only one item of Physical Man-Made Thing..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P155_has_co-reference_target",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P155_has_co-reference_target",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property connects an E91 Co-Reference Assignment to the target of the references that are regarded as co-referring.\n\t"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P153_assigned_co-reference_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P153_assigned_co-reference_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"comment": "This property connects an E91 Co-Reference Assignment to one of the propositional objects co-referring to the co-reference target\n\t"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P154_assigned_non_co-reference_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P154_assigned_non_co-reference_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E91_Co-Reference_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E89_Propositional_Object",
			"comment": "This property connects an E91 Co-Reference Assignment to one of the propositional objects not co-referring to the co-reference target\n\t"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P38_deassigned",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P38_deassigned",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"comment": "This property records the identifier that was deassigned from an instance of E1 CRM Entity.\nDeassignment of an identifier may be necessary when an item is taken out of an inventory, a new numbering sy..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P142_used_constituent",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P142_used_constituent",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E90_Symbolic_Object",
			"comment": "This property associates the event of assigning an instance of E42 Identifier to an entity, with the instances of E41 Appellation that were used as elements of the identifier.\n"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P37_assigned",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P37_assigned",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"comment": "This property records the identifier that was assigned to an item in an Identifier Assignment activity.\nThe same identifier may be assigned on more than one occasion.\nAn Identifier might be created pr..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P5i_forms_part_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P5i_forms_part_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P35i_was_identified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P35i_was_identified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E14_Condition_Assessment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P44i_is_condition_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P44i_is_condition_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P5_consists_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P5_consists_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
			"comment": "This property describes the decomposition of an E3 Condition State into discrete, subsidiary states. \nIt is assumed that the sub-states into which the condition state is analysed form a logical whole ..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P84i_was_maximum_duration_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P84i_was_maximum_duration_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P83i_was_minimum_duration_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P83i_was_minimum_duration_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E52_Time-Span",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P43i_is_dimension_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P43i_is_dimension_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E70_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P40i_was_observed_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P40i_was_observed_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E16_Measurement",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P90_has_value",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P90_has_value",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"range": "http://www.w3.org/2000/01/rdf-schema#Literal",
			"comment": "This property allows an E54 Dimension to be approximated by an E60 Number primitive."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P91_has_unit",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P91_has_unit",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E58_Measurement_Unit",
			"comment": "This property shows the type of unit an E54 Dimension was expressed in."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P58i_defines_section",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P58i_defines_section",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E46_Section_Definition",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P38i_was_deassigned_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P38i_was_deassigned_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P37i_was_assigned_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P37i_was_assigned_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E15_Identifier_Assignment",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P48i_is_preferred_identifier_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P48i_is_preferred_identifier_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E42_Identifier",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P104i_applies_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P104i_applies_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E30_Right",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E72_Legal_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P75i_is_possessed_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P75i_is_possessed_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E30_Right",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P144_joined_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P144_joined_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E85_Joining",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"comment": "This property identifies the instance of E74 Group of which an instance of E39 Actor becomes a member through an instance of E85 Joining.\nAlthough a Joining activity normally concerns only one instanc..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P143_joined",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P143_joined",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E85_Joining",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": "This property identifies the instance of E39 Actor that becomes member of a E74 Group in an E85 Joining.\n \tJoining events allow for describing people becoming members of a group with a more detailed p..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P100_was_death_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P100_was_death_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E69_Death",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"comment": "This property property links an E69 Death event to the E21 Person that died."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P39_measured",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P39_measured",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E16_Measurement",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property associates an instance of E16 Measurement with the instance of E1 CRM Entity to which it applied. An instance of E1 CRM Entity may be measured more than once. Material and immaterial thi..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P40_observed_dimension",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P40_observed_dimension",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E16_Measurement",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E54_Dimension",
			"comment": "This property records the dimension that was observed in an E16 Measurement Event.\nE54 Dimension can be any quantifiable aspect of E70 Thing. Weight, image colour depth and monetary value are dimensio..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P54i_is_current_permanent_location_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P54i_is_current_permanent_location_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P59i_is_located_on_or_within",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P59i_is_located_on_or_within",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P157_is_at_rest_relative_to"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P157_is_at_rest_relative_to",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P157_is_at_rest_relative_to",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "This property associates an instance of P53 Place with the instance of E18 Physical Thing that determines a reference space for this instance of P53 Place by being at rest with respect to this referen..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P26i_was_destination_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P26i_was_destination_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P74i_is_current_or_former_residence_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P74i_is_current_or_former_residence_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E39_Actor",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P7i_witnessed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P7i_witnessed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E4_Period",
			"comment": "",
			"subproperties": ["http://www.cidoc-crm.org/cidoc-crm/P26i_was_destination_of",
			"http://www.cidoc-crm.org/cidoc-crm/P27i_was_origin_of"]
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P89i_contains",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P89i_contains",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P27i_was_origin_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P27i_was_origin_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E9_Move",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P87_is_identified_by",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P87_is_identified_by",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E44_Place_Appellation",
			"comment": "This property identifies an E53 Place using an E44 Place Appellation. \nExamples of Place Appellations used to identify Places include instances of E48 Place Name, addresses, E47 Spatial Coordinates et..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P53i_is_former_or_current_location_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P53i_is_former_or_current_location_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E18_Physical_Thing",
			"comment": "",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P55i_currently_holds"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P89_falls_within",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P89_falls_within",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This property identifies an instance of E53 Place that falls wholly within the extent of another E53 Place.\nIt addresses spatial containment only, and does not imply any relationship between things or..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P55i_currently_holds",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P55i_currently_holds",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E19_Physical_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P122_borders_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P122_borders_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This symmetric property allows the instances of E53 Place which share common borders to be related as such. \nThis property is purely spatial, in contrast to Allen operators, which are purely temporal...."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P121_overlaps_with",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P121_overlaps_with",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E53_Place",
			"comment": "This symmetric property allows the instances of E53 Place with overlapping geometric extents to be associated with each other. \nIt does not specify anything about the shared area. This property is pur..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P151_was_formed_from",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P151_was_formed_from",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E66_Formation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"comment": "This property associates an instance of E66 Formation with an instance of E74 Group from which the new group was formed preserving a sense of continuity such as in mission, membership or tradition.\n\t"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P95_has_formed",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P95_has_formed",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E66_Formation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"comment": "This property links the founding or E66 Formation for an E74 Group with the Group itself."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P94_has_created",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P94_has_created",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E65_Creation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E28_Conceptual_Object",
			"comment": "This property allows a conceptual E65 Creation to be linked to the E28 Conceptual Object created by it. \nIt represents the act of conceiving the intellectual content of the E28 Conceptual Object. It d...",
			"subproperties": "http://www.cidoc-crm.org/cidoc-crm/P135_created_type"
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P72i_is_language_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P72i_is_language_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E56_Language",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E33_Linguistic_Object",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P96_by_mother",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P96_by_mother",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"comment": "This property links an E67 Birth event to an E21 Person as a participant in the role of birth-giving mother.\n\nNote that biological fathers are not necessarily participants in the Birth (see P97 from f..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P98_brought_into_life",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P98_brought_into_life",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"comment": "This property links an E67Birth event to an E21 Person in the role of offspring.\nTwins, triplets etc. are brought into life by the same Birth event. This is not intended for use with general Natural H..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P97_from_father",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P97_from_father",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"comment": "This property links an E67 Birth event to an E21 Person in the role of biological father.\nNote that biological fathers are not seen as necessary participants in the Birth, whereas birth-giving mothers..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P99_dissolved",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P99_dissolved",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E68_Dissolution",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E74_Group",
			"comment": "This property links the disbanding or E68 Dissolution of an E74 Group to the Group itself."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P97i_was_father_for",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P97i_was_father_for",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P152i_is_parent_of",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P152i_is_parent_of",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P96i_gave_birth",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P96i_gave_birth",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P98i_was_born",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P98i_was_born",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E67_Birth",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P100i_died_in",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P100i_died_in",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E69_Death",
			"comment": ""
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P152_has_parent",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P152_has_parent",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E21_Person",
			"comment": "This property associates an instance of E21 Person with another instance of E21 Person who plays the role of the first instance’s parent, regardless of whether the relationship is biological parenthoo..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P136_was_based_on",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P136_was_based_on",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E83_Type_Creation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E1_CRM_Entity",
			"comment": "This property identifies one or more items that were used as evidence to declare a new E55 Type.\nThe examination of these items is often the only objective way to understand the precise characteristic..."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P135_created_type",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P135_created_type",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E83_Type_Creation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E55_Type",
			"comment": "This property identifies the E55 Type, which is created in an E83Type Creation activity."
		},
		{
			"uri": "http://www.cidoc-crm.org/cidoc-crm/P149i_identifies",
			"namespace": "http://www.cidoc-crm.org/cidoc-crm/",
			"label": "P149i_identifies",
			"domain": "http://www.cidoc-crm.org/cidoc-crm/E75_Conceptual_Object_Appellation",
			"range": "http://www.cidoc-crm.org/cidoc-crm/E28_Conceptual_Object",
			"comment": ""
		}]
	}
};


function findClassfrom_CIDOC_CRM(uri){
    try{
        var cidocClasses = CIDOC_CRM_GRAPH.TargetSchemaFile.classes === null ? [] :
                (CIDOC_CRM_GRAPH.TargetSchemaFile.classes instanceof Array ? CIDOC_CRM_GRAPH.TargetSchemaFile.classes :
                [CIDOC_CRM_GRAPH.TargetSchemaFile.classes]);
        var c;
        $.each(cidocClasses, function(i, clazz) {
            if(clazz.uri === uri) c = clazz;
        });
        return c;
    }
    catch (err){
        var nil;
        return nil;
    }
}


//Extracts from URL variable with name 
function extractMappingID(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Converts an XML Object to String
function xmlToString(xmlData) { 

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        if (typeof XMLSerializer !== "undefined"){
            return (new XMLSerializer()).serializeToString(xmlData);
        } else {
            return $(xmlData).html();
        }
    }
}