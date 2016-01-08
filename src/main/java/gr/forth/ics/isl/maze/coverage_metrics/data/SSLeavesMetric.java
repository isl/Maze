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
package gr.forth.ics.isl.maze.coverage_metrics.data;

import gr.forth.ics.isl.maze.source_schema.data.TreeSourceSchema;
import java.util.ArrayList;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import org.apache.log4j.Logger;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "CoveredParentElements",
    "CoveredChildElements",
    "CoveredSourceSchema"
})
@XmlRootElement(name = "SSLeavesMetric")
public class SSLeavesMetric {
    
    private static Logger logger = Logger.getLogger(SSLeavesMetric.class);
    private double CoveredParentElements;
    private double CoveredChildElements;
    private double CoveredSourceSchema;

    public static Logger getLogger() {
        return logger;
    }

    public static void setLogger(Logger logger) {
        SSLeavesMetric.logger = logger;
    }

    public double getCoveredParentElements() {
        return CoveredParentElements;
    }

    public void setCoveredParentElements(double CoveredParentElements) {
        this.CoveredParentElements = CoveredParentElements;
    }

    public double getCoveredChildElements() {
        return CoveredChildElements;
    }

    public void setCoveredChildElements(double CoveredChildElements) {
        this.CoveredChildElements = CoveredChildElements;
    }

    public double getCoveredSourceSchema() {
        return CoveredSourceSchema;
    }

    public void setCoveredSourceSchema(double CoveredSourceSchema) {
        this.CoveredSourceSchema = CoveredSourceSchema;
    }
    
    public void RUN_METRIC(TreeSourceSchema tree, ArrayList<String> ssRefsList) {
        
        logger.error("Not implemented yet: Source Schema Direct Metric!");
        this.CoveredParentElements = 0;
        this.CoveredChildElements = 0;
        this.CoveredSourceSchema = 0;
    }
}
