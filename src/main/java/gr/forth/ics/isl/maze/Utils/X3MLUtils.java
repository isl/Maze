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
package gr.forth.ics.isl.maze.Utils;

import gr.forth.ics.isl.maze.x3ml.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Provides helpers and functions about an X3ML object.
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class X3MLUtils {
    private static Logger logger = Logger.getLogger(X3MLUtils.class);
    
    /**
     * Find source schema references in mapping
     * @param x3ml X3ML object
     * @return ArrayList of strings with all source schema references in mapping
     */
    public static ArrayList<String> findReferencesSourceSchema(X3ML x3ml){
        ArrayList<String> refList = new ArrayList<>();
        
        for(Mapping mapping: x3ml.getMappings().getMapping()){
            refList.add(mapping.getDomain().getSourceNode());
            for(Link link: mapping.getLink()){
                refList.add(link.getPath().getSourceRelation().getRelation());
                refList.add(link.getRange().getSourceNode());
            }
        }
        refList = Utils.removeDublicatesFromArrayList(refList);
        
        ArrayList<String> newrefList = new ArrayList<>();
        for(String ref: refList){
            ref = ref.replace("//", "").replace(" ", "");
            if(ref.contains("==")){
                String[] parts = ref.split("==");
                newrefList.addAll(Arrays.asList(parts));
            }
            else if(ref.contains("/")){
                String[] parts = ref.split("/");
                for(String p : parts){
                    if(!p.equals("")) newrefList.add(p);
                }
            }
            else{
                newrefList.add(ref);
            }
        }
        
        newrefList = Utils.removeDublicatesFromArrayList(newrefList);
        /*for(String ref: newrefList){
            //System.out.println(ref);
        }
        //System.out.println(newrefList.size());*/
        //logger.info("References about SourceSchema count: "+newrefList.size());
        return newrefList;
    }
    
    /**
     * Find target schema references classes in mapping
     * @param x3mlDoc X3ML document (xml)
     * @param x3ml X3ML object
     * @return HashMap<String, String> of strings with  
     * key the label and value the namespace of class
     */
    public static HashMap<String, String> findReferencedClasses(Document x3mlDoc, X3ML x3ml){
        ArrayList<String> classList = new ArrayList<>();
        
        NodeList nodeList = x3mlDoc.getElementsByTagName("type");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node childNode = nodeList.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                classList.add(childNode.getTextContent());
            }
        }
        classList = Utils.removeDublicatesFromArrayList(classList);
        
        //Create correlation namespace and class
        HashMap<String, String> namespaces = findReferencedNamespaces(x3ml);
        HashMap<String, String> classMap = new HashMap<>();
        for(String c: classList){
            String preff = "noprefix";
            String className = c;
            for (Map.Entry<String, String> entry : namespaces.entrySet()) {
                String preffix = entry.getKey();
                String url = entry.getValue();
                if(c.contains(preffix+":")){
                    preff = url;
                    className = c.replace(preffix, "").replace(":", "");
                }
            }
            classMap.put(className, preff);
        }
        //logger.info("Referenced Classes count: "+classMap.size());
        return classMap;
    }
    
    /**
     * Find target schema references Namespaces in mapping
     * @param x3ml X3ML object
     * @return HashMap<String, String> of strings with  
     * key the prefix and value the uri of class
     */
    public static HashMap<String, String> findReferencedNamespaces(X3ML x3ml){
        HashMap<String, String> namespaces = new HashMap<>();
        for(Namespace ns: x3ml.getNamespaces().getNamespace()){
            namespaces.put(ns.getPrefix(), ns.getUri());
        }
        //logger.info("Referenced namespaces count: "+namespaces.size());
        return namespaces;
    }
    
    /**
     * Find target schema references Properties in mapping
     * @param x3mlDoc X3ML document (xml)
     * @param x3ml X3ML object
     * @return HashMap<String, String> of strings with  
     * key the label and value the namespace of property
     */
    public static HashMap<String, String> findReferencedProperties(Document x3mlDoc, X3ML x3ml){
        ArrayList<String> propList = new ArrayList<>();
        
        NodeList nodeList = x3mlDoc.getElementsByTagName("relationship");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node childNode = nodeList.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                propList.add(childNode.getTextContent());
            }
        }
        propList = Utils.removeDublicatesFromArrayList(propList);
        
        //Create correlation namespace and class
        HashMap<String, String> namespaces = findReferencedNamespaces(x3ml);
        HashMap<String, String> classMap = new HashMap<>();
        for(String c: propList){
            String preff = "noprefix";
            String propName = c;
            for (Map.Entry<String, String> entry : namespaces.entrySet()) {
                String preffix = entry.getKey();
                String url = entry.getValue();
                if(c.contains(preffix+":")){
                    preff = url;
                    propName = c.replace(preffix, "").replace(":", "");
                }
            }
            classMap.put(propName, preff);
        }
        //logger.info("Referenced properties count: "+classMap.size());
        return classMap;
    }
    
    /**
     * Order in alphabetical order the mapping elements
     * @param x3ml X3ML object
     * @return X3ML X3ML object
     */
    public static X3ML orderX3ML(X3ML x3ml){
        
        try{
            X3ML newX3ml = new X3ML();
            newX3ml.setInfo(x3ml.getInfo());

            //Order namespaces
            //**********************
            HashMap<String, Namespace> namespaceMap = new HashMap<>();
            ArrayList<String> namespaceList = new ArrayList<>();
            for(Namespace n: x3ml.getNamespaces().getNamespace()){
                namespaceList.add(n.getPrefix());
                namespaceMap.put(n.getPrefix(), n);
            }
            Collections.sort(namespaceList);
            Namespaces newNamespaces = new Namespaces();
            for(String n: namespaceList){
                newNamespaces.getNamespace().add(namespaceMap.get(n));
            }
            newX3ml.setNamespaces(newNamespaces);

            //Order mappings
            //**********************
            HashMap<String, Mapping> mappingMap = new HashMap<>();
            ArrayList<String> mappingList = new ArrayList<>();
            for(Mapping m: x3ml.getMappings().getMapping()){
                mappingList.add(m.getDomain().getSourceNode());
                mappingMap.put(m.getDomain().getSourceNode(), m);
            }
            Collections.sort(mappingList);
            Mappings newMappings = new Mappings();
            for(String m: mappingList){
                newMappings.getMapping().add(mappingMap.get(m));
            }

            //Order links
            //**********************
            for(Mapping m: newMappings.getMapping()){
                HashMap<String, Link> linksMap = new HashMap<>();
                ArrayList<String> linksList = new ArrayList<>();
                for(Link l: m.getLink()){
                    linksList.add(l.getPath().getSourceRelation().getRelation());
                    linksMap.put(l.getPath().getSourceRelation().getRelation(), l);
                }
                Collections.sort(linksList);
                m.getLink().clear();
                for(String l: linksList){
                    m.getLink().add(linksMap.get(l));
                }
            }
            newX3ml.setMappings(newMappings);

            return newX3ml;
        }
        catch(Exception ex){
            logger.error("Cannot order X3ML file: "+x3ml.getInfo().getTitle(), ex);
            return x3ml;
        }
    }
    
    /**
     * Getting a mapping element from source schema references
     * @param x3ml X3ML object
     * @param sourceRef String
     * @return ArrayList of Mapping Objects
     */
    public static ArrayList<Mapping> getMappingFromSourceReference(X3ML x3ml, String sourceRef){
        try{
            ArrayList<Mapping> mappingsList = new ArrayList<>();
            
            for(Mapping m: x3ml.getMappings().getMapping()){
                boolean covered = false;
                String sourceNode = m.getDomain().getSourceNode();
                XpathExpression xpath = new XpathExpression(sourceNode);
                for(String str: xpath.splitToArray()){
                    if(str.equals(sourceRef)){
                        covered = true;
                    }
                }
                if(!covered){ //search to links
                    for(Link l : m.getLink()){
                        String linkSourceNode = l.getRange().getSourceNode();
                        XpathExpression linkXpath = new XpathExpression(linkSourceNode);
                        for(String str: linkXpath.splitToArray()){
                            if(str.equals(sourceRef)){
                                covered = true;
                            }
                        }
                        
                        String linkSourceRelation = l.getPath().getSourceRelation().getRelation();
                        XpathExpression linkSLXpath = new XpathExpression(linkSourceRelation);
                        for(String str: linkSLXpath.splitToArray()){
                            if(str.equals(sourceRef)){
                                covered = true;
                            }
                        }
                    }
                }
                
                if(covered) mappingsList.add(m);
            }
                    
            return mappingsList;
        }
        catch(Exception ex){
            logger.error("Error during find mapping for sourse ref: "+sourceRef, ex);
            return new ArrayList<Mapping>();
        }
    }
    
}
