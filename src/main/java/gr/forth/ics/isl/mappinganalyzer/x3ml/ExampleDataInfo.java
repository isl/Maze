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
    "exampleDataFrom",
    "exampleDataContactPerson",
    "exampleDataSourceRecord",
    "exampleDataTargetRecord"
})
@XmlRootElement(name = "example_data_info")
public class ExampleDataInfo {

    @XmlElement(name = "example_data_from", required = true)
    protected String exampleDataFrom;
    @XmlElement(name = "example_data_contact_person", required = true)
    protected String exampleDataContactPerson;
    @XmlElement(name = "example_data_source_record", required = true)
    protected ExampleDataSourceRecord exampleDataSourceRecord;
    @XmlElement(name = "example_data_target_record", required = true)
    protected ExampleDataTargetRecord exampleDataTargetRecord;

    /**
     * Gets the value of the exampleDataFrom property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExampleDataFrom() {
        return exampleDataFrom;
    }

    /**
     * Sets the value of the exampleDataFrom property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExampleDataFrom(String value) {
        this.exampleDataFrom = value;
    }

    /**
     * Gets the value of the exampleDataContactPerson property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExampleDataContactPerson() {
        return exampleDataContactPerson;
    }

    /**
     * Sets the value of the exampleDataContactPerson property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExampleDataContactPerson(String value) {
        this.exampleDataContactPerson = value;
    }

    /**
     * Gets the value of the exampleDataSourceRecord property.
     * 
     * @return
     *     possible object is
     *     {@link ExampleDataSourceRecord }
     *     
     */
    public ExampleDataSourceRecord getExampleDataSourceRecord() {
        return exampleDataSourceRecord;
    }

    /**
     * Sets the value of the exampleDataSourceRecord property.
     * 
     * @param value
     *     allowed object is
     *     {@link ExampleDataSourceRecord }
     *     
     */
    public void setExampleDataSourceRecord(ExampleDataSourceRecord value) {
        this.exampleDataSourceRecord = value;
    }

    /**
     * Gets the value of the exampleDataTargetRecord property.
     * 
     * @return
     *     possible object is
     *     {@link ExampleDataTargetRecord }
     *     
     */
    public ExampleDataTargetRecord getExampleDataTargetRecord() {
        return exampleDataTargetRecord;
    }

    /**
     * Sets the value of the exampleDataTargetRecord property.
     * 
     * @param value
     *     allowed object is
     *     {@link ExampleDataTargetRecord }
     *     
     */
    public void setExampleDataTargetRecord(ExampleDataTargetRecord value) {
        this.exampleDataTargetRecord = value;
    }

}
