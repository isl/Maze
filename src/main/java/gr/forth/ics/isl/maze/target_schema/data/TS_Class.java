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
    "comment",
    "size",
    "subclasses",
    "triangles"
})
@XmlRootElement(name = "TS_Class")
public class TS_Class {
    private String uri;
    private String namespace;
    private String label;
    private String comment;
    private double size;
    private ArrayList<String> subclasses;
    private ArrayList<Triangle> triangles;

    public double getSize() {
        return size;
    }

    public void setSize(double size) {
        this.size = size;
    }
    
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ArrayList<String> getSubclasses() {
        return subclasses;
    }

    public void setSubclasses(ArrayList<String> subclasses) {
        if(subclasses==null){
            this.subclasses = new ArrayList<>();
        }
        else{
            this.subclasses = subclasses;
        }
    }
    
    public void addSubClass(String classUri) {
        if (this.subclasses == null) {
            this.subclasses = new ArrayList<>();
        }
        this.subclasses.add(classUri);
    }

    public ArrayList<Triangle> getTriangles() {
        return triangles;
    }

    public void setTriangles(ArrayList<Triangle> triangles) {
        this.triangles = triangles;
    }
    
    public void addTriangle(Triangle triangle) {
        if (this.triangles == null) {
            this.triangles = new ArrayList<>();
        }
        this.triangles.add(triangle);
    }
    
}
