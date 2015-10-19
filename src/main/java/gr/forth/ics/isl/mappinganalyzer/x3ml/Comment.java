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
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "rationale",
    "alternatives",
    "typicalMistakes",
    "localHabits",
    "linkToCookBook",
    "example",
    "commentsLastUpdate"
})
@XmlRootElement(name = "comment")
public class Comment {

    @XmlAttribute(name = "type", required = true)
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    protected String type;
    @XmlElement(required = true)
    protected String rationale;
    @XmlElement(required = true)
    protected String alternatives;
    @XmlElement(name = "typical_mistakes", required = true)
    protected String typicalMistakes;
    @XmlElement(name = "local_habits", required = true)
    protected String localHabits;
    @XmlElement(name = "link_to_cook_book", required = true)
    protected String linkToCookBook;
    @XmlElement(required = true)
    protected Example example;
    @XmlElement(name = "comments_last_update", required = true)
    protected CommentsLastUpdate commentsLastUpdate;

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Gets the value of the rationale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRationale() {
        return rationale;
    }

    /**
     * Sets the value of the rationale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRationale(String value) {
        this.rationale = value;
    }

    /**
     * Gets the value of the alternatives property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAlternatives() {
        return alternatives;
    }

    /**
     * Sets the value of the alternatives property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAlternatives(String value) {
        this.alternatives = value;
    }

    /**
     * Gets the value of the typicalMistakes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTypicalMistakes() {
        return typicalMistakes;
    }

    /**
     * Sets the value of the typicalMistakes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTypicalMistakes(String value) {
        this.typicalMistakes = value;
    }

    /**
     * Gets the value of the localHabits property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLocalHabits() {
        return localHabits;
    }

    /**
     * Sets the value of the localHabits property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLocalHabits(String value) {
        this.localHabits = value;
    }

    /**
     * Gets the value of the linkToCookBook property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLinkToCookBook() {
        return linkToCookBook;
    }

    /**
     * Sets the value of the linkToCookBook property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLinkToCookBook(String value) {
        this.linkToCookBook = value;
    }

    /**
     * Gets the value of the example property.
     * 
     * @return
     *     possible object is
     *     {@link Example }
     *     
     */
    public Example getExample() {
        return example;
    }

    /**
     * Sets the value of the example property.
     * 
     * @param value
     *     allowed object is
     *     {@link Example }
     *     
     */
    public void setExample(Example value) {
        this.example = value;
    }

    /**
     * Gets the value of the commentsLastUpdate property.
     * 
     * @return
     *     possible object is
     *     {@link CommentsLastUpdate }
     *     
     */
    public CommentsLastUpdate getCommentsLastUpdate() {
        return commentsLastUpdate;
    }

    /**
     * Sets the value of the commentsLastUpdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link CommentsLastUpdate }
     *     
     */
    public void setCommentsLastUpdate(CommentsLastUpdate value) {
        this.commentsLastUpdate = value;
    }

}
