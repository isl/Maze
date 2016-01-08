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


package gr.forth.ics.isl.maze.coverage_metrics.data;

import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.Utils.X3MLUtils;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import org.w3c.dom.Document;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "coveredClassesList",
    "coveredPropertiesList"
})
@XmlRootElement(name = "CoverageTargetSchemaList")
public class CoverageTargetSchemaList {
    private ArrayList<String> coveredClassesList;
    private ArrayList<String> coveredPropertiesList;

    public ArrayList<String> getCoveredClassesList() {
        return coveredClassesList;
    }

    public void setCoveredClassesList(ArrayList<String> coveredClassesList) {
        this.coveredClassesList = coveredClassesList;
    }
    
    public void addCoveredClass(String uri) {
        if(this.coveredClassesList==null){
            this.coveredClassesList = new ArrayList<>();
        }
        this.coveredClassesList.add(uri);
        this.coveredClassesList = Utils.removeDublicatesFromArrayList(this.coveredClassesList);
    }

    public ArrayList<String> getCoveredPropertiesList() {
        return coveredPropertiesList;
    }

    public void setCoveredPropertiesList(ArrayList<String> coveredPropertiesList) {
        this.coveredPropertiesList = coveredPropertiesList;
    }
    
    public void addCoveredProperty(String uri) {
        if(this.coveredPropertiesList==null){
            this.coveredPropertiesList = new ArrayList<>();
        }
        this.coveredPropertiesList.add(uri);
        this.coveredPropertiesList = Utils.removeDublicatesFromArrayList(this.coveredPropertiesList);
    }
}
