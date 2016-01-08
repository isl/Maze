/*
 * Copyright 2015 Institute of Computer Science,
 * Foundation for Research and Technology - Hellas
 * Licensed under the EUPL, Version 1.1 or - as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at: http://ec.europa.eu/idabc/eupl
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 *
 * Contact:  POBox 1385, Heraklio Crete, GR-700 13 GREECE
 * Tel:+30-2810-391632 Fax: +30-2810-391638 E-mail: isl@ics.forth.gr http://www.ics.forth.gr/isl
 *
 * Authors : Anyfantis Nikolaos (nanifant 'at' ics 'dot' forth 'dot' gr)
 *
 * This file is part of the Mapping Analyze (Maze) app.
 */
package gr.forth.ics.isl.maze.mapping_rules;

import gr.forth.ics.isl.maze.Utils.XpathExpression;
import gr.forth.ics.isl.maze.mapping_rules.data.MappingRulesSchema;
import gr.forth.ics.isl.maze.mapping_rules.data.RuleClass;
import gr.forth.ics.isl.maze.mapping_rules.data.RuleConnection;
import gr.forth.ics.isl.maze.mapping_rules.data.TreeBranchSourceSchema_MappingRule;
import gr.forth.ics.isl.maze.mapping_rules.data.TreeSourceSchema_ComparisonMR;
import gr.forth.ics.isl.maze.mapping_rules.data.TreeSourceSchema_MappingRules;
import gr.forth.ics.isl.maze.x3ml.Entity;
import gr.forth.ics.isl.maze.x3ml.Link;
import gr.forth.ics.isl.maze.x3ml.Mapping;
import gr.forth.ics.isl.maze.x3ml.TargetRelation;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.util.ArrayList;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class ComparisonMappingRules_Generator {
    
    private static Logger logger = Logger.getLogger(ComparisonMappingRules_Generator.class);
    private TreeSourceSchema_ComparisonMR treeMappingRules;
    
    
    public TreeSourceSchema_ComparisonMR createComparisonMappingRules(X3ML x3ml1, X3ML x3ml2, Document sourceDoc){
        try{
            logger.info("Start generating mapping rules....");
            this.treeMappingRules = new TreeSourceSchema_ComparisonMR();
            
            Node root = sourceDoc.getDocumentElement();
            String rootName = root.getNodeName();
            TreeBranchSourceSchema_MappingRule rootBranch = new TreeBranchSourceSchema_MappingRule();
            rootBranch.setUUID();
            rootBranch.setHasCovered(Boolean.TRUE);
            rootBranch.setBranchName(rootName);
            rootBranch.setChildren(saveDOMTree(root));
            
            this.treeMappingRules.setRoot(rootBranch);
            
            //generate RuleClasses and connections
            MappingRulesSchema mappingRulesSchema1 = generateMappingRulesSchema(x3ml1);
            MappingRulesSchema mappingRulesSchema2 = generateMappingRulesSchema(x3ml2);
            
            this.treeMappingRules.addMappingRulesSchema(mappingRulesSchema1);
            this.treeMappingRules.addMappingRulesSchema(mappingRulesSchema2);
            logger.info("Mapping Rules Finished!");
            try{
                logger.info("[Mapping Rules Count]: " + mappingRulesSchema1.getClasses().size());
            }catch(Exception e){}
            
            return this.treeMappingRules;
        }catch(Exception ex){
            logger.error("Cannot create Comparison MappingRules for:" 
                    + x3ml1.getInfo().getTitle() + ", " 
                    + x3ml2.getInfo().getTitle(), ex);
            return null;
        }
    }
    
    private ArrayList<TreeBranchSourceSchema_MappingRule> saveDOMTree(Node parentNode) {
        ArrayList<TreeBranchSourceSchema_MappingRule> results = new ArrayList<>();
        
        String parentName = parentNode.getNodeName();
        TreeBranchSourceSchema_MappingRule parentBranch = new TreeBranchSourceSchema_MappingRule();
        parentBranch.setUUID();
        parentBranch.setHasCovered(Boolean.FALSE);
        parentBranch.setBranchName(parentName);
        
        NodeList childrenList = parentNode.getChildNodes();
        for (int i = 0; i < childrenList.getLength(); i++) {
            Node childNode = childrenList.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                String childName = childNode.getNodeName();
                TreeBranchSourceSchema_MappingRule childBranch = new TreeBranchSourceSchema_MappingRule();
                childBranch.setUUID();
                childBranch.setHasCovered(Boolean.FALSE);
                childBranch.setBranchName(childName);
                if(!branchExists(childBranch, results)){
                    results.add(childBranch);
                }
                childBranch.setChildren(saveDOMTree(childNode));
            }
        }
        TreeBranchSourceSchema_MappingRule emptyBranch = new TreeBranchSourceSchema_MappingRule();
        emptyBranch.setBranchName("");
        results.add(emptyBranch);
        return results;
    }
    
    private boolean branchExists(TreeBranchSourceSchema_MappingRule branch, 
            ArrayList<TreeBranchSourceSchema_MappingRule> list){
        for(TreeBranchSourceSchema_MappingRule b: list){
            if(b.getBranchName().equals(branch.getBranchName())){
                return true;
            }
        }
        return false;
    }
    
    
    private MappingRulesSchema generateMappingRulesSchema(X3ML x3ml){
        MappingRulesSchema mappingRulesSchema = new MappingRulesSchema();
        
        //Generate rule schema
        for(Mapping mapping : x3ml.getMappings().getMapping()){
            
            //Create classes from domain
            Entity domainEntity = mapping.getDomain().getTargetNode().getEntity();
            ArrayList<RuleClass> domainClassList = new ArrayList<>();
            RuleClass domainClass = new RuleClass();
            domainClass.setUUID();
            for(String type: domainEntity.getType()){
                domainClass.addLabel(type);
            }
            domainClass.setVariable(domainEntity.getVariable());
            domainClassList.add(domainClass);
            mappingRulesSchema.addClass(domainClass);
            
            //Get source node from domain
            String domainSourceNode = mapping.getDomain().getSourceNode();
            XpathExpression xpdsn = new XpathExpression(domainSourceNode);
            
            //Search in er if covers elements
            for(TreeBranchSourceSchema_MappingRule table : this.treeMappingRules.getRoot().getDescedants()){
                //check if covered table name
                if(xpdsn.contains(table.getBranchName())){
                    for(RuleClass rc : domainClassList){
                        RuleConnection con = new RuleConnection();
                        con.setTarget(rc.getUUID());
                        con.setProperty("type");
                        table.addConnection(con);
                        RuleConnection conInv = new RuleConnection();
                        conInv.setTarget(table.getUUID());
                        conInv.setProperty("type");
                        rc.addConnection(conInv);
                    }
                    table.setHasCovered(Boolean.TRUE);
                }
                //check in table's attributes
                for(TreeBranchSourceSchema_MappingRule attr : table.getDescedants()){
                    //check if covered table name
                    if(xpdsn.contains(attr.getBranchName())){
                        for(RuleClass rc : domainClassList){
                            RuleConnection con = new RuleConnection();
                            con.setTarget(rc.getUUID());
                            con.setProperty("type");
                            attr.addConnection(con);
                            RuleConnection conInv = new RuleConnection();
                            conInv.setTarget(attr.getUUID());
                            conInv.setProperty("type");
                            rc.addConnection(conInv);
                        }
                        attr.setHasCovered(Boolean.TRUE);
                    }
                }
            }
     
            //Search in links
            //*******************
            for(Link link : mapping.getLink()){
                
                //Create classes from domain
                Entity rangeEntity = link.getRange().getTargetNode().getEntity();
                ArrayList<RuleClass> rangeClassList = new ArrayList<>();
                RuleClass rangeClass = new RuleClass();
                rangeClass.setUUID();
                for (String type : rangeEntity.getType()) {
                    rangeClass.addLabel(type);
                }
                rangeClass.setVariable(rangeEntity.getVariable());
                rangeClassList.add(rangeClass);
                mappingRulesSchema.addClass(rangeClass);

                //Get source node from domain
                String rangeSourceNode = link.getRange().getSourceNode();
                XpathExpression xprsn = new XpathExpression(rangeSourceNode);
                
                //Search in er if covers elements
                for(TreeBranchSourceSchema_MappingRule table : this.treeMappingRules.getRoot().getDescedants()){
                    //check if covered table name
                    if(xprsn.contains(table.getBranchName())){
                        for(RuleClass rc : rangeClassList){
                            RuleConnection con = new RuleConnection();
                            con.setTarget(rc.getUUID());
                            con.setProperty("type");
                            table.addConnection(con);
                            RuleConnection conInv = new RuleConnection();
                            conInv.setTarget(table.getUUID());
                            conInv.setProperty("type");
                            rc.addConnection(conInv);
                        }
                        table.setHasCovered(Boolean.TRUE);
                    }
                    //check in table's attributes
                    for(TreeBranchSourceSchema_MappingRule attr : table.getDescedants()){
                        //check if covered table name
                        if(xprsn.contains(attr.getBranchName())){
                            for(RuleClass rc : rangeClassList){
                                RuleConnection con = new RuleConnection();
                                con.setTarget(rc.getUUID());
                                con.setProperty("type");
                                attr.addConnection(con);
                                RuleConnection conInv = new RuleConnection();
                                conInv.setTarget(attr.getUUID());
                                conInv.setProperty("type");
                                rc.addConnection(conInv);
                            }
                            attr.setHasCovered(Boolean.TRUE);
                        }
                    }
                }
                
                
                //Add path of link TargetRelation!! 
                TargetRelation targetRelation = link.getPath().getTargetRelation();
                ArrayList<RuleClass> fromClassList = domainClassList;
                for (int i = 0; i < targetRelation.getIfOrPropertyOrEntity().size(); i++) {
                    Object obj = targetRelation.getIfOrPropertyOrEntity().get(i);
                    if(obj instanceof String){ //is relationship
                        String relationship = (String) obj;
                        Entity entity = null;
                        Object o = null;
                        try{
                            o = targetRelation.getIfOrPropertyOrEntity().get(1 + i);
                        }
                        catch(Exception exc){
                            entity = null;
                        }
                        if(o instanceof Entity) {
                            entity = (Entity) o;
                            ArrayList<RuleClass> toClassesList = mappingRulesSchema.getClassesWithVariable(entity.getVariable());
                            if(!toClassesList.isEmpty()){
                                for(RuleClass fc : fromClassList){
                                    for(RuleClass c : toClassesList){
                                        RuleConnection con = new RuleConnection();
                                        con.setTarget(c.getUUID());
                                        con.setProperty(relationship);
                                        fc.addConnection(con);
                                        RuleConnection conInv = new RuleConnection();
                                        conInv.setTarget(fc.getUUID());
                                        conInv.setProperty(relationship);
                                        c.addConnection(conInv);
                                    }
                                }
                            }
                            else{
                                RuleClass relationClass = new RuleClass();
                                relationClass.setUUID();
                                for (String type : entity.getType()) {
                                    relationClass.addLabel(type);
                                }
                                relationClass.setVariable(entity.getVariable());
                                toClassesList.add(relationClass);
                                mappingRulesSchema.addClass(relationClass);
                                for(RuleClass fc : fromClassList){
                                    for(RuleClass c : toClassesList){
                                        RuleConnection con = new RuleConnection();
                                        con.setTarget(c.getUUID());
                                        con.setProperty(relationship);
                                        fc.addConnection(con);
                                        RuleConnection conInv = new RuleConnection();
                                        conInv.setTarget(fc.getUUID());
                                        conInv.setProperty(relationship);
                                        c.addConnection(conInv);
                                    }
                                }
                            }
                            //Add path of link source relation
                            String sourceRelation = link.getPath().getSourceRelation().getRelation();
                            XpathExpression xpsr = new XpathExpression(sourceRelation);

                            for (TreeBranchSourceSchema_MappingRule table : this.treeMappingRules.getRoot().getDescedants()) {
                                if (xpdsn.contains(table.getBranchName())) {
                                    for (TreeBranchSourceSchema_MappingRule a : table.getDescedants()) {
                                        if (xpsr.contains(a.getBranchName())) {
                                            //add connection
                                            for(RuleClass c : rangeClassList){
                                                RuleConnection con = new RuleConnection();
                                                con.setTarget(c.getUUID());
                                                con.setProperty("type");
                                                a.addConnection(con);
                                                RuleConnection conInv = new RuleConnection();
                                                conInv.setTarget(a.getUUID());
                                                conInv.setProperty(relationship);
                                                c.addConnection(conInv);
                                            }
                                            a.setHasCovered(Boolean.TRUE);
                                        }
                                    }
                                }
                            }
                            for (TreeBranchSourceSchema_MappingRule table : this.treeMappingRules.getRoot().getDescedants()) {
                                if (xprsn.contains(table.getBranchName())) {
                                    for (TreeBranchSourceSchema_MappingRule a : table.getDescedants()) {
                                        if (xpsr.contains(a.getBranchName())) {
                                            for(RuleClass c : rangeClassList){
                                                RuleConnection con = new RuleConnection();
                                                con.setTarget(c.getUUID());
                                                con.setProperty("type");
                                                a.addConnection(con);
                                                RuleConnection conInv = new RuleConnection();
                                                conInv.setTarget(a.getUUID());
                                                conInv.setProperty(relationship);
                                                c.addConnection(conInv);
                                            }
                                            a.setHasCovered(Boolean.TRUE);
                                        }
                                    }
                                }
                            }
                            fromClassList = toClassesList;
                        }
                        else if(o == null){ //is empty
                            ArrayList<RuleClass> toClassesList = rangeClassList;
                            for(RuleClass fc : fromClassList){
                                for(RuleClass c : toClassesList){
                                    RuleConnection con = new RuleConnection();
                                    con.setTarget(c.getUUID());
                                    con.setProperty(relationship);
                                    fc.addConnection(con);
                                    RuleConnection conInv = new RuleConnection();
                                    conInv.setTarget(fc.getUUID());
                                    conInv.setProperty(relationship);
                                    c.addConnection(conInv);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return mappingRulesSchema;
    }
    
}
