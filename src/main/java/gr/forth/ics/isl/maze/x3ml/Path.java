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
    "sourceRelation",
    "targetRelation",
    "comments"
})
@XmlRootElement(name = "path")
public class Path {

    @XmlElement(name = "source_relation", required = true)
    protected SourceRelation sourceRelation;
    @XmlElement(name = "target_relation", required = true)
    protected TargetRelation targetRelation;
    protected Comments comments;

    /**
     * Gets the value of the sourceRelation property.
     * 
     * @return
     *     possible object is
     *     {@link SourceRelation }
     *     
     */
    public SourceRelation getSourceRelation() {
        return sourceRelation;
    }

    /**
     * Sets the value of the sourceRelation property.
     * 
     * @param value
     *     allowed object is
     *     {@link SourceRelation }
     *     
     */
    public void setSourceRelation(SourceRelation value) {
        this.sourceRelation = value;
    }

    /**
     * Gets the value of the targetRelation property.
     * 
     * @return
     *     possible object is
     *     {@link TargetRelation }
     *     
     */
    public TargetRelation getTargetRelation() {
        return targetRelation;
    }

    /**
     * Sets the value of the targetRelation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TargetRelation }
     *     
     */
    public void setTargetRelation(TargetRelation value) {
        this.targetRelation = value;
    }

    /**
     * Gets the value of the comments property.
     * 
     * @return
     *     possible object is
     *     {@link Comments }
     *     
     */
    public Comments getComments() {
        return comments;
    }

    /**
     * Sets the value of the comments property.
     * 
     * @param value
     *     allowed object is
     *     {@link Comments }
     *     
     */
    public void setComments(Comments value) {
        this.comments = value;
    }

}
