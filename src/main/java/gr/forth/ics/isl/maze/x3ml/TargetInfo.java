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
package gr.forth.ics.isl.maze.x3ml;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "targetSchema",
    "targetCollection"
})
@XmlRootElement(name = "target_info")
public class TargetInfo {

    @XmlElement(name = "target_schema", required = true)
    protected TargetSchema targetSchema;
    @XmlElement(name = "target_collection", required = true)
    protected String targetCollection;

    /**
     * Gets the value of the targetSchema property.
     * 
     * @return
     *     possible object is
     *     {@link TargetSchema }
     *     
     */
    public TargetSchema getTargetSchema() {
        return targetSchema;
    }

    /**
     * Sets the value of the targetSchema property.
     * 
     * @param value
     *     allowed object is
     *     {@link TargetSchema }
     *     
     */
    public void setTargetSchema(TargetSchema value) {
        this.targetSchema = value;
    }

    /**
     * Gets the value of the targetCollection property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTargetCollection() {
        return targetCollection;
    }

    /**
     * Sets the value of the targetCollection property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTargetCollection(String value) {
        this.targetCollection = value;
    }

}
