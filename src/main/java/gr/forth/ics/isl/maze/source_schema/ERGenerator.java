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
package gr.forth.ics.isl.maze.source_schema;

import gr.forth.ics.isl.maze.source_schema.data.ERSourceSchema;
import gr.forth.ics.isl.maze.source_schema.data.ERTable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class ERGenerator {

    private static Logger logger = Logger.getLogger(ERGenerator.class);
    private TreeMap<String, ArrayList<String>> domTree;
    private ERSourceSchema ER;
    private Document xmlDoc;
    
    public ERSourceSchema createER(Document scDoc) {
        try {
            this.domTree = new TreeMap<>();
            this.ER = new ERSourceSchema();
            this.xmlDoc = scDoc;
            
            Node root = this.xmlDoc.getDocumentElement();
            saveDOMTree(root);
            convertDomToTables();
            findTablesConnections();
            return this.ER;
        } catch (Exception ex) {
            logger.error("Cannot create ER");
            return null;
        }
    }
    
    private void saveDOMTree(Node parentNode) {
        String parentName = parentNode.getNodeName();
        
        NodeList childrenList = parentNode.getChildNodes();
        for (int i = 0; i < childrenList.getLength(); i++) {
            Node childNode = childrenList.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                String childName = childNode.getNodeName();
                //System.out.println(parentName+" - "+childName);
                
                //If does not contain key create new table
                if(!this.domTree.containsKey(parentName)){
                    ArrayList<String> list = new ArrayList<>();
                    list.add(childName);
                    this.domTree.put(parentName, list);
                }
                else{//else add to existing element
                    this.domTree.get(parentName).add(childName);
                }
                //Recursion
                saveDOMTree(childNode);
            }
        }
    }
    
    private void convertDomToTables(){
        String rootName = this.xmlDoc.getDocumentElement().getNodeName();
        
        for(Map.Entry<String, ArrayList<String>> entry : this.domTree.entrySet()) {
            String tableName = entry.getKey();
            ArrayList<String> valueList = entry.getValue();
            
            //Remove Dublicates in lists
            Set<String> hs = new HashSet<>();
            hs.addAll(valueList);
            valueList.clear();
            valueList.addAll(hs);
            
            //Create new Table
            ERTable table = new ERTable();
            table.setTableName(tableName);
            if(tableName.equals(rootName)){
                table.setType("root");
            }else{
                table.setType("table");
            }
            table.setAttributes(valueList);
            
            this.ER.addTable(table);
        }
    }

    private void findTablesConnections(){
        ArrayList<ERTable> tablesList = this.ER.getTables();
        
        for(ERTable table : this.ER.getTables()){
            ArrayList<String> connList = new ArrayList<>();
            //System.out.println(table.getTableName());
            for(String attr : table.getAttributes()){
                for(ERTable table1 : tablesList){
                    if(!table.getTableName().equals(table1.getTableName())){
                        for(String attr1 : table1.getAttributes()){
                            if(attr.equals(attr1)){
                                connList.add(table1.getTableName());
                            }
                        }
                    }
                }
            }
            //Remove Dublicates in lists
            Set<String> hs = new HashSet<>();
            hs.addAll(connList);
            connList.clear();
            connList.addAll(hs);
            table.setConnections(connList);
        }
    }

}
