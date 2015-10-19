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
package gr.forth.ics.isl.mappinganalyzer.singlex3ml;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 *
 * @author Nikos
 */

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "filesNum",
    "X3mlFileDetails"
})
@XmlRootElement(name = "X3MLFiles")
public class X3MLFiles {
    
    private int filesNum;
    private ArrayList<X3mlFileDetails> X3mlFileDetails;
    
    public ArrayList<X3mlFileDetails> getX3MLFiles() {
        if (X3mlFileDetails == null) {
            X3mlFileDetails = new ArrayList<X3mlFileDetails>();
        }
        return this.X3mlFileDetails;
    }
    
    public int getFilesNum() {
        return this.filesNum;
    }
    
    public void setFilesNum(int value){
        this.filesNum = value;
    }
    
    public X3MLFiles() {
        this.X3mlFileDetails = new ArrayList<X3mlFileDetails>();
    }
}
