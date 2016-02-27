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
import java.util.UUID;
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
    "uid",
    "name",
    "hasCovered",
    "mappingType",
    "joins",
    "connections"
})
@XmlRootElement(name = "ERAttribute_MappingRule")
public class ERAttribute_MappingRule {
    private String uid;
    private String name;
    private Boolean hasCovered;
    private ArrayList<String> mappingType;
    private ArrayList<String> joins;
    private ArrayList<RuleConnection> connections;

    public ArrayList<RuleConnection> getConnections() {
        return connections;
    }

    public void setConnections(ArrayList<RuleConnection> connections) {
        this.connections = connections;
    }
    
    public void addConnection(RuleConnection con) {
        if(this.connections == null ){
            this.connections = new ArrayList<>();
        }
        if(!connectionExists(con)){
            this.connections.add(con);
        }
    }
    
    private boolean connectionExists(RuleConnection connection){
        try{
            for(RuleConnection con : this.connections){
                if(con.getProperty().equals(connection.getProperty()) 
                        && con.getTarget().equals(connection.getTarget())){
                    return true;
                }
            }
            return false;
        }
        catch(Exception ex){
            return false;
        }
    }

    public String getUid() {
        return uid;
    }

    public void setUUID() {
        UUID uid = UUID.randomUUID();
        this.uid = uid.toString();
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getHasCovered() {
        return hasCovered;
    }

    public void setHasCovered(Boolean hasCovered) {
        this.hasCovered = hasCovered;
    }

    public ArrayList<String> getMappingType() {
        return mappingType;
    }

    public void setMappingType(ArrayList<String> mappingType) {
        this.mappingType = mappingType;
    }

    public ArrayList<String> getJoins() {
        return joins;
    }

    public void setJoins(ArrayList<String> joins) {
        this.joins = joins;
    }
    
    
}
