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

import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.source_schema.data.TreeBranchSourceSchema;
import gr.forth.ics.isl.maze.source_schema.data.TreeSourceSchema;
import java.util.ArrayList;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class TreeGenerator {
    private static Logger logger = Logger.getLogger(TreeGenerator.class);
    private TreeSourceSchema tree;
    private Document xmlDoc;
    
    public TreeSourceSchema createTree(String filename) {
        try {
            //this.domTree = new TreeMap<String, ArrayList<String>>();
            this.tree = new TreeSourceSchema();
            this.xmlDoc = Utils.retreiveSourceSchema_from3M_toXML(filename);
            
            Node root = this.xmlDoc.getDocumentElement();
            String rootName = root.getNodeName();
            this.tree.addParentName(rootName);
            TreeBranchSourceSchema rootBranch = new TreeBranchSourceSchema();
            rootBranch.setBranchName(rootName);
            this.tree.setRoot(rootBranch);
            
            rootBranch.setChildren(saveDOMTree(root));
            
            return this.tree;
        } catch (Exception ex) {
            logger.error("Cannot create Tree from file " + filename);
            return null;
        }
    }
    
    private ArrayList<TreeBranchSourceSchema> saveDOMTree(Node parentNode) {
        ArrayList<TreeBranchSourceSchema> results = new ArrayList<>();
        
        String parentName = parentNode.getNodeName();
        TreeBranchSourceSchema parentBranch = new TreeBranchSourceSchema();
        parentBranch.setBranchName(parentName);
        
        NodeList childrenList = parentNode.getChildNodes();
        for (int i = 0; i < childrenList.getLength(); i++) {
            Node childNode = childrenList.item(i);
            int childCounter = 0;
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                String childName = childNode.getNodeName();
                TreeBranchSourceSchema childBranch = new TreeBranchSourceSchema();
                childBranch.setBranchName(childName);
                if(!branchExists(childBranch, results)){
                    results.add(childBranch);
                }
                childBranch.setChildren(saveDOMTree(childNode));
                childCounter++;
            }
            if(childCounter>0){
                this.tree.addParentName(parentName);
            }
            else{
                this.tree.addLeafName(parentName);
            }
        }
        TreeBranchSourceSchema emptyBranch = new TreeBranchSourceSchema();
        emptyBranch.setBranchName("");
        results.add(emptyBranch);
        return results;
    }
    
    private boolean branchExists(TreeBranchSourceSchema branch, ArrayList<TreeBranchSourceSchema> list){
        for(TreeBranchSourceSchema b: list){
            if(b.getBranchName().equals(branch.getBranchName())){
                return true;
            }
        }
        return false;
    }
}
