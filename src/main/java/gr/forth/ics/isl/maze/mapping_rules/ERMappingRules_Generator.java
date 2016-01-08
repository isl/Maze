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
import gr.forth.ics.isl.maze.mapping_rules.data.ERAttribute_MappingRule;
import gr.forth.ics.isl.maze.mapping_rules.data.ERSourceSchema_MappingRules;
import gr.forth.ics.isl.maze.mapping_rules.data.ERTable_MappingRules;
import gr.forth.ics.isl.maze.mapping_rules.data.MappingRulesSchema;
import gr.forth.ics.isl.maze.mapping_rules.data.RuleClass;
import gr.forth.ics.isl.maze.mapping_rules.data.RuleConnection;
import gr.forth.ics.isl.maze.source_schema.*;
import gr.forth.ics.isl.maze.source_schema.data.ERSourceSchema;
import gr.forth.ics.isl.maze.x3ml.Entity;
import gr.forth.ics.isl.maze.x3ml.Link;
import gr.forth.ics.isl.maze.x3ml.Mapping;
import gr.forth.ics.isl.maze.x3ml.TargetRelation;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.util.ArrayList;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class ERMappingRules_Generator {
    private static Logger logger = Logger.getLogger(ERMappingRules_Generator.class);
    private ERSourceSchema_MappingRules rulesER;
    private MappingRulesSchema mappingRulesSchema;
    private X3ML x3ml;
    
    public ERSourceSchema_MappingRules createERMappingRules(X3ML x3mlObj, Document sourceDoc){
        try{
            this.x3ml = x3mlObj;
            this.rulesER = new ERSourceSchema_MappingRules();
            this.mappingRulesSchema = new MappingRulesSchema();
            
            ERGenerator erGen = new ERGenerator();
            ERSourceSchema er = erGen.createER(sourceDoc);
            this.rulesER.copyTablesFromER(er);
            generateMappingRulesSchema();
            this.rulesER.setMappingRulesSchema(mappingRulesSchema);
            return this.rulesER;
        }
        catch(Exception ex){
            logger.error("Cannot create ER Mapping rules for:"+x3ml.getInfo().getTitle(), ex);
            return null;
        }
    }
 
    private void generateMappingRulesSchema() {
        
        //Genertate uuids for ER
        for(ERTable_MappingRules t : this.rulesER.getTables()){
            t.setUUID();
            for(ERAttribute_MappingRule attr : t.getAttributes()){
                attr.setUUID();
            }
        }
        
        //Generate rule schema
        for(Mapping mapping : this.x3ml.getMappings().getMapping()){
            
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
            this.mappingRulesSchema.addClass(domainClass);
            
            //Get source node from domain
            String domainSourceNode = mapping.getDomain().getSourceNode();
            XpathExpression xpdsn = new XpathExpression(domainSourceNode);
            
            //Search in er if covers elements
            for(ERTable_MappingRules table : this.rulesER.getTables()){
                //check if covered table name
                if(xpdsn.contains(table.getTableName())){
                    for(RuleClass rc : domainClassList){
                        RuleConnection con = new RuleConnection();
                        con.setTarget(rc.getUUID());
                        con.setProperty("type");
                        table.addConnection(con);
                        RuleConnection conInv = new RuleConnection();
                        conInv.setTarget(table.getUid());
                        conInv.setProperty("type");
                        rc.addConnection(conInv);
                    }
                    table.setHasCovered(Boolean.TRUE);
                }
                //check in table's attributes
                for(ERAttribute_MappingRule attr : table.getAttributes()){
                    //check if covered table name
                    if(xpdsn.contains(attr.getName())){
                        for(RuleClass rc : domainClassList){
                            RuleConnection con = new RuleConnection();
                            con.setTarget(rc.getUUID());
                            con.setProperty("type");
                            attr.addConnection(con);
                            RuleConnection conInv = new RuleConnection();
                            conInv.setTarget(attr.getUid());
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
                this.mappingRulesSchema.addClass(rangeClass);

                //Get source node from domain
                String rangeSourceNode = link.getRange().getSourceNode();
                XpathExpression xprsn = new XpathExpression(rangeSourceNode);
                
                //Search in er if covers elements
                for(ERTable_MappingRules table : this.rulesER.getTables()){
                    //check if covered table name
                    if(xprsn.contains(table.getTableName())){
                        for(RuleClass rc : rangeClassList){
                            RuleConnection con = new RuleConnection();
                            con.setTarget(rc.getUUID());
                            con.setProperty("type");
                            table.addConnection(con);
                            RuleConnection conInv = new RuleConnection();
                            conInv.setTarget(table.getUid());
                            conInv.setProperty("type");
                            rc.addConnection(conInv);
                        }
                        table.setHasCovered(Boolean.TRUE);
                    }
                    //check in table's attributes
                    for(ERAttribute_MappingRule attr : table.getAttributes()){
                        //check if covered table name
                        if(xprsn.contains(attr.getName())){
                            for(RuleClass rc : rangeClassList){
                                RuleConnection con = new RuleConnection();
                                con.setTarget(rc.getUUID());
                                con.setProperty("type");
                                attr.addConnection(con);
                                RuleConnection conInv = new RuleConnection();
                                conInv.setTarget(attr.getUid());
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
                            ArrayList<RuleClass> toClassesList = this.mappingRulesSchema.getClassesWithVariable(entity.getVariable());
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
                                this.mappingRulesSchema.addClass(relationClass);
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

                            for (ERTable_MappingRules table : this.rulesER.getTables()) {
                                if (xpdsn.contains(table.getTableName())) {
                                    for (ERAttribute_MappingRule a : table.getAttributes()) {
                                        if (xpsr.contains(a.getName())) {
                                            //add connection
                                            for(RuleClass c : rangeClassList){
                                                RuleConnection con = new RuleConnection();
                                                con.setTarget(c.getUUID());
                                                con.setProperty("type");
                                                a.addConnection(con);
                                                RuleConnection conInv = new RuleConnection();
                                                conInv.setTarget(a.getUid());
                                                conInv.setProperty(relationship);
                                                c.addConnection(conInv);
                                            }
                                            a.setHasCovered(Boolean.TRUE);
                                        }
                                    }
                                }
                            }
                            for (ERTable_MappingRules table : this.rulesER.getTables()) {
                                if (xprsn.contains(table.getTableName())) {
                                    for (ERAttribute_MappingRule a : table.getAttributes()) {
                                        if (xpsr.contains(a.getName())) {
                                            for(RuleClass c : rangeClassList){
                                                RuleConnection con = new RuleConnection();
                                                con.setTarget(c.getUUID());
                                                con.setProperty("type");
                                                a.addConnection(con);
                                                RuleConnection conInv = new RuleConnection();
                                                conInv.setTarget(a.getUid());
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
    }
    
}