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

import java.util.ArrayList;
import java.util.List;
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
    "title",
    "generalDescription",
    "sourceInfo",
    "targetInfo",
    "mappingInfo",
    "exampleDataInfo"
})
@XmlRootElement(name = "info")
public class Info {

    @XmlElement(required = true)
    protected String title;
    @XmlElement(name = "general_description", required = true)
    protected String generalDescription;
    @XmlElement(name = "source_info", required = true)
    protected SourceInfo sourceInfo;
    @XmlElement(name = "target_info", required = true)
    protected List<TargetInfo> targetInfo;
    @XmlElement(name = "mapping_info", required = true)
    protected MappingInfo mappingInfo;
    @XmlElement(name = "example_data_info", required = true)
    protected ExampleDataInfo exampleDataInfo;

    /**
     * Gets the value of the title property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the value of the title property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTitle(String value) {
        this.title = value;
    }

    /**
     * Gets the value of the generalDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGeneralDescription() {
        return generalDescription;
    }

    /**
     * Sets the value of the generalDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGeneralDescription(String value) {
        this.generalDescription = value;
    }

    /**
     * Gets the value of the sourceInfo property.
     * 
     * @return
     *     possible object is
     *     {@link SourceInfo }
     *     
     */
    public SourceInfo getSourceInfo() {
        return sourceInfo;
    }

    /**
     * Sets the value of the sourceInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link SourceInfo }
     *     
     */
    public void setSourceInfo(SourceInfo value) {
        this.sourceInfo = value;
    }

    /**
     * Gets the value of the targetInfo property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the targetInfo property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTargetInfo().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TargetInfo }
     * 
     * 
     */
    public List<TargetInfo> getTargetInfo() {
        if (targetInfo == null) {
            targetInfo = new ArrayList<TargetInfo>();
        }
        return this.targetInfo;
    }

    /**
     * Gets the value of the mappingInfo property.
     * 
     * @return
     *     possible object is
     *     {@link MappingInfo }
     *     
     */
    public MappingInfo getMappingInfo() {
        return mappingInfo;
    }

    /**
     * Sets the value of the mappingInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link MappingInfo }
     *     
     */
    public void setMappingInfo(MappingInfo value) {
        this.mappingInfo = value;
    }

    /**
     * Gets the value of the exampleDataInfo property.
     * 
     * @return
     *     possible object is
     *     {@link ExampleDataInfo }
     *     
     */
    public ExampleDataInfo getExampleDataInfo() {
        return exampleDataInfo;
    }

    /**
     * Sets the value of the exampleDataInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link ExampleDataInfo }
     *     
     */
    public void setExampleDataInfo(ExampleDataInfo value) {
        this.exampleDataInfo = value;
    }

}
