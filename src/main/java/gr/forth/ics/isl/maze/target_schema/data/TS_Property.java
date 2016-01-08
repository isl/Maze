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
    "uri",
    "namespace",
    "label",
    "domain",
    "range",
    "comment",
    "subproperties"
})
@XmlRootElement(name = "TS_Property")
public class TS_Property {
    private String uri;
    private String namespace;
    private String label;
    private ArrayList<String> domain;
    private ArrayList<String> range;
    private String comment;
    private ArrayList<String> subproperties;

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ArrayList<String> getDomain() {
        return domain;
    }

    public void setDomain(ArrayList<String> domain) {
        if (domain == null) {
            this.domain = new ArrayList<>();
        }
        else{
            this.domain = domain;
        }
    }

    public ArrayList<String> getRange() {
        return range;
    }

    public void setRange(ArrayList<String> range) {
        if (range == null) {
            this.range = new ArrayList<>();
        }
        else{
            this.range = range;
        }
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ArrayList<String> getSubproperties() {
        return subproperties;
    }

    public void setSubproperties(ArrayList<String> subproperties) {
        this.subproperties = subproperties;
    }
    
    public void addSubProperty(String propUri) {
        if (this.subproperties == null) {
            this.subproperties = new ArrayList<String>();
        }
        this.subproperties.add(propUri);
    }
}
