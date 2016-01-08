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
package gr.forth.ics.isl.maze.instance.data;

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
    "label",
    "typeClass",
    "incomingProperties",
    "outgoingProperties"
})
@XmlRootElement(name = "InstanceRecord")
public class InstanceRecord {
    
    private String uri;
    private String label;
    private ArrayList<String> typeClass;
    private ArrayList<PropertyInstance> incomingProperties;
    private ArrayList<PropertyInstance> outgoingProperties;

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ArrayList<String> getTypeClass() {
        return typeClass;
    }

    public void setTypeClass(ArrayList<String> typeClass) {
        this.typeClass = typeClass;
    }

    public ArrayList<PropertyInstance> getIncomingProperties() {
        return incomingProperties;
    }

    public void setIncomingProperties(ArrayList<PropertyInstance> properties) {
        this.incomingProperties = properties;
    }
    
    public void addIncomingProperty(PropertyInstance prop){
        if(this.incomingProperties == null){
            this.incomingProperties = new ArrayList<>();
        }
        
        boolean exists = false;
        for(PropertyInstance p : this.incomingProperties){
            if(p.getUri().equals(prop.getUri()) && p.getResource().equals(prop.getResource())){
                exists = true;
                break;
            }
        }
        
        //add it if unique
        if(!exists){
            this.incomingProperties.add(prop);
        }
    }

    public ArrayList<PropertyInstance> getOutgoingProperties() {
        return outgoingProperties;
    }

    public void setOutgoingProperties(ArrayList<PropertyInstance> outgoingProperties) {
        this.outgoingProperties = outgoingProperties;
    }
    
    public void addOutgoingProperty(PropertyInstance prop){
        if(this.outgoingProperties == null){
            this.outgoingProperties = new ArrayList<>();
        }
        
        boolean exists = false;
        for(PropertyInstance p : this.outgoingProperties){
            if(p.getUri().equals(prop.getUri()) && p.getResource().equals(prop.getResource())){
                exists = true;
                break;
            }
        }
        
        //add it if unique
        if(!exists){
            this.outgoingProperties.add(prop);
        }
    }
}
