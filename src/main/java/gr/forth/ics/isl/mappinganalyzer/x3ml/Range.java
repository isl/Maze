/*
 * Copyright 2015 Institute of Computer Science,
 *
 * Foundation for Research and Technology - Hellas
 *
 *
 *
 * Licensed under the EUPL, Version 1.1 or - as soon they will be approved
 *
 * by the European Commission - subsequent versions of the EUPL (the "Licence");
 *
 * You may not use this work except in compliance with the Licence.
 *
 * You may obtain a copy of the Licence at:
 *
 *
 *
 * http://ec.europa.eu/idabc/eupl
 *
 *
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 *
 * under the Licence is distributed on an "AS IS" basis,
 *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the Licence for the specific language governing permissions and limitations
 *
 * under the Licence.
 *
 *
 *
 * Contact:  POBox 1385, Heraklio Crete, GR-700 13 GREECE
 *
 * Tel:+30-2810-391632
 *
 * Fax: +30-2810-391638
 *
 * E-mail: isl@ics.forth.gr
 *
 * http://www.ics.forth.gr/isl
 *
 *
 *
 * Authors : Anyfantis Nikolaos
 *
 *
 * This file is part of the Mapping Analyze (Maze) app.
 */
package gr.forth.ics.isl.mappinganalyzer.x3ml;

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
    "sourceNode",
    "targetNode",
    "comments"
})
@XmlRootElement(name = "range")
public class Range {

    @XmlElement(name = "source_node", required = true)
    protected SourceNode sourceNode;
    @XmlElement(name = "target_node", required = true)
    protected TargetNode targetNode;
    protected Comments comments;

    /**
     * Gets the value of the sourceNode property.
     * 
     * @return
     *     possible object is
     *     {@link SourceNode }
     *     
     */
    public SourceNode getSourceNode() {
        return sourceNode;
    }

    /**
     * Sets the value of the sourceNode property.
     * 
     * @param value
     *     allowed object is
     *     {@link SourceNode }
     *     
     */
    public void setSourceNode(SourceNode value) {
        this.sourceNode = value;
    }

    /**
     * Gets the value of the targetNode property.
     * 
     * @return
     *     possible object is
     *     {@link TargetNode }
     *     
     */
    public TargetNode getTargetNode() {
        return targetNode;
    }

    /**
     * Sets the value of the targetNode property.
     * 
     * @param value
     *     allowed object is
     *     {@link TargetNode }
     *     
     */
    public void setTargetNode(TargetNode value) {
        this.targetNode = value;
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
