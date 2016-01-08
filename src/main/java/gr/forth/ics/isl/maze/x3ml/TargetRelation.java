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

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "ifOrPropertyOrEntity"
})
@XmlRootElement(name = "target_relation")
public class TargetRelation {

    @XmlElements({
        @XmlElement(name = "if", type = If.class),
        @XmlElement(name = "property", type = Property.class),
        @XmlElement(name = "entity", type = Entity.class),
        @XmlElement(name = "relationship", type = String.class),
    })
    protected List<Object> ifOrPropertyOrEntity;

    /**
     * Gets the value of the ifOrPropertyOrEntity property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the ifOrPropertyOrEntity property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getIfOrPropertyOrEntity().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link If }
     * {@link Property }
     * {@link Entity }
     * 
     * 
     */
    public List<Object> getIfOrPropertyOrEntity() {
        if (ifOrPropertyOrEntity == null) {
            ifOrPropertyOrEntity = new ArrayList<Object>();
        }
        return this.ifOrPropertyOrEntity;
    }

}
