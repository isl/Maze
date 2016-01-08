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
package gr.forth.ics.isl.maze.target_schema.data;

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
    "Name",
    "FileName",
    "Version",
    "Type",
    "targetSchemaMetrics",
    "classes",
    "properties",
})
@XmlRootElement(name = "TargetSchemaFile")
public class TargetSchemaFile {
    
    private String Name;
    private String FileName;
    private String Version;
    private String Type;
    private TargetSchemaMetrics targetSchemaMetrics;
    private ArrayList<TS_Class> classes;
    private ArrayList<TS_Property> properties;

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getFileName() {
        return FileName;
    }

    public void setFileName(String FileName) {
        this.FileName = FileName;
    }

    public String getVersion() {
        return Version;
    }

    public void setVersion(String Version) {
        this.Version = Version;
    }

    public String getType() {
        return Type;
    }

    public void setType(String Type) {
        this.Type = Type;
    }

    public TargetSchemaMetrics getTargetSchemaMetrics() {
        return targetSchemaMetrics;
    }

    public void setTargetSchemaMetrics(TargetSchemaMetrics targetSchemaMetrics) {
        this.targetSchemaMetrics = targetSchemaMetrics;
    }

    public ArrayList<TS_Class> getClasses() {
        return classes;
    }

    public void setClasses(ArrayList<TS_Class> classes) {
        this.classes = classes;
    }
    
    public void addClass(TS_Class c) {
        if (this.classes == null) {
            this.classes = new ArrayList<TS_Class>();
        }
        this.classes.add(c);
    }

    public ArrayList<TS_Property> getProperties() {
        return properties;
    }

    public void setProperties(ArrayList<TS_Property> properties) {
        this.properties = properties;
    }
    
    public void addProperty(TS_Property p) {
        if (this.properties == null) {
            this.properties = new ArrayList<TS_Property>();
        }
        this.properties.add(p);
    }
}
