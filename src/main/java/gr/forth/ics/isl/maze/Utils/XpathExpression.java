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

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Implements a xpath expression 
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class XpathExpression {
    private String xpathString;
    
    /**
     * Contracts class XpathExpression
     * @param str String
     */
    public XpathExpression(String str){
        this.xpathString = str;
    }
    
    /**
     * Finds if is an xpath expression
     * @return boolean if it is XpathExpression or not
     */
    public boolean isXpath(){
        if(this.xpathString.contains("/") || this.xpathString.contains("==")){
            return true;
        }
        return false;
    }
    
    public boolean contains(String ref){
        boolean covered = false;
        for(String s : this.splitToArray()){
            if(ref.equals(s))  covered = true;
        }
        return covered;
    }
    
    /**
     * Returns a list spitting the xpath to elements by "/", "==", "//"
     * @return ArrayList of strings splitting expression to elements
     */
    public ArrayList<String> splitToArray(){
        //System.out.println("xpath: "+this.xpathString);
        ArrayList<String> list = new ArrayList<>();
        if(this.isXpath()){
            String curXpath = this.xpathString;
            if(curXpath.contains("//")){
                curXpath = curXpath.replace("//","");
                //list.addAll(Arrays.asList(this.xpathString));
            }
            if(curXpath.contains("/")){
                String[] parts = curXpath.split("/");
                list.addAll(Arrays.asList(parts));
            }else{
                list.add(curXpath);
            }
            
            ArrayList<String> newlist = new ArrayList<>();
            for(String s : list){
                if(s.contains("==")) {
                    String[] parts = curXpath.split("==");
                    newlist.addAll(Arrays.asList(parts));
                }
                else{
                    newlist.add(s);
                }
            }
            list = newlist;
        }
        else{
            list.add(this.xpathString);
        }
        ArrayList<String> finalList = new ArrayList<>();
        for(String s : list){
            s = s.trim();
            if(!s.equals("")){
                finalList.add(s);
                //System.out.println("final xpath: "+s);
            }
        }
        return finalList;
    }
}
