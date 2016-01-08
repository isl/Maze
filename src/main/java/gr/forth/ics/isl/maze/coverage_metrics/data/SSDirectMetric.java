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
@XmlRootElement(name = "SSDirectMetric")
public class SSDirectMetric {
    private static Logger logger = Logger.getLogger(SSDirectMetric.class);
    private double CoveredParentElements;
    private double CoveredChildElements;
    private double CoveredSourceSchema;

    public static Logger getLogger() {
        return logger;
    }

    public static void setLogger(Logger logger) {
        SSDirectMetric.logger = logger;
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
    
    public void RUN_METRIC(TreeSourceSchema tree, ArrayList<String> ssRefsList, ArrayList<String> excludeRefsList) {
        
        try{
            //count parent elements
            ArrayList<String> allParentNamesList = tree.getAllParentNames();
            int parentCounter = 0;
            for(String parent : allParentNamesList){
                boolean covered = false;
                for(String ref : ssRefsList){
                    if(parent.trim().equals(ref.trim())){
                        covered = true;
                        break;
                    }
                }
                
                boolean exclude = false;
                if(excludeRefsList != null){
                    for(String exRef : excludeRefsList){
                        if(exRef.equals(parent)) {
                            exclude = true;
                            break;
                        }
                    }
                }
                
                if(covered || exclude){
                    parentCounter++;
                }
            }
            double coveredParents = (double)parentCounter;
            double totalParents = (double)allParentNamesList.size();
            
            //count leaves elements
            ArrayList<String> allLeavesNamesList = tree.getAllLeavesNames();
            int leavesCounter = 0;
            for(String leaf : allLeavesNamesList){
                boolean covered = false;
                for(String ref : ssRefsList){
                    if(leaf.trim().equals(ref.trim())){
                        covered = true;
                        break;
                    }
                }
                
                boolean exclude = false;
                if(excludeRefsList != null){
                    for(String exRef : excludeRefsList){
                        if(exRef.equals(leaf)) {
                            exclude = true;
                            break;
                        }
                    }
                }
                
                if(covered || exclude){
                    leavesCounter++;
                }
                
            }
            double coveredLeaves = (double)leavesCounter;
            double totalLeaves = (double)allLeavesNamesList.size();
            
                    
            //Create percentages
            double ssPercentage = ((coveredParents+coveredLeaves) / (totalParents+totalLeaves)) * 100;
            this.CoveredParentElements = Math.round((coveredParents / totalParents) * 100);
            this.CoveredChildElements = Math.round((coveredLeaves / totalLeaves) * 100);
            this.CoveredSourceSchema = Math.round(ssPercentage);
        }
        catch(NullPointerException ex){
            logger.error("Problem on running Source Schema Direct Metric!", ex);
            this.CoveredParentElements = 0;
            this.CoveredChildElements = 0;
            this.CoveredSourceSchema = 0;
        }
    }
}
