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
package gr.forth.ics.isl.maze.mapping_rules.data;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "classes"
})
@XmlRootElement(name = "MappingRulesSchema")
public class MappingRulesSchema {
    
    private ArrayList<RuleClass> classes;

    public ArrayList<RuleClass> getClasses() {
        return classes;
    }

    public void setClasses(ArrayList<RuleClass> classes) {
        this.classes = classes;
    }
    
    public void addClass(RuleClass clazz){
        if(this.classes == null){
            this.classes = new ArrayList<>();
        }
        this.classes.add(clazz);
    }
    
    public ArrayList<RuleClass> getClassesWithVariable(String variable){
        try{
            ArrayList<RuleClass> classesList = new ArrayList<>();
            if(this.classes == null){
                return new ArrayList<>();
            }
            else{
                for(RuleClass clazz : this.classes){
                    if(clazz.getVariable() != null){
                        if(clazz.getVariable().equals(variable)){
                            classesList.add(clazz);
                        }
                    }
                }
                return classesList;
            }
        }
        catch(Exception ex){
            return new ArrayList<>();
        }
    }
}
