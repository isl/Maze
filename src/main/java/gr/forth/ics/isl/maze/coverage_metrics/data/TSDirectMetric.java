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

import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntProperty;
import gr.forth.ics.isl.maze.target_schema.TargetSchemaReasoner;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
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
    "CoveredClasses",
    "CoveredProperties",
    "CoveredTargetSchema"
})
@XmlRootElement(name = "TSDirectMetric")
public class TSDirectMetric {
    private static Logger logger = Logger.getLogger(TSDirectMetric.class);
    private double CoveredClasses;
    private double CoveredProperties;
    private double CoveredTargetSchema;

    public static Logger getLogger() {
        return logger;
    }

    public static void setLogger(Logger logger) {
        TSDirectMetric.logger = logger;
    }

    public double getCoveredClasses() {
        return CoveredClasses;
    }

    public void setCoveredClasses(double CoveredClasses) {
        this.CoveredClasses = CoveredClasses;
    }

    public double getCoveredProperties() {
        return CoveredProperties;
    }

    public void setCoveredProperties(double CoveredProperties) {
        this.CoveredProperties = CoveredProperties;
    }

    public double getCoveredTargetSchema() {
        return CoveredTargetSchema;
    }

    public void setCoveredTargetSchema(double CoveredTargetSchema) {
        this.CoveredTargetSchema = CoveredTargetSchema;
    }
    
    public void RUN_METRIC(
            TargetSchemaReasoner reasoner,
            HashMap<String, String> x3mlClasses,
            HashMap<String, String> x3mlProp,
            ArrayList<String> excludeList) {
        
        try{
            //Count Classes
            ArrayList<OntClass> targetClasses = reasoner.getModelClassesList(Boolean.FALSE);
            int classCounter = 0;
            for(OntClass c : targetClasses){
                String c_uri = c.getURI();
                String c_label = c_uri.replace(c.getNameSpace(), "").trim();
                
                boolean covered = false;
                for (Map.Entry<String, String> entry : x3mlClasses.entrySet()) {
                    String key = entry.getKey().trim(); //x3mlClasses label
                    if(c_label.equals(key)){
                        covered = true;
                        break;
                    }
                }
                
                boolean exclude = false;
                if(excludeList != null){
                    for(String excl : excludeList){
                        if(excl.equals(c_uri)){
                            exclude = true;
                            break;
                        }
                    }
                }
                
                if(covered || exclude){
                    classCounter++;
                }
            }
            double coveredClasses = (double)classCounter;
            double totalClasses = (double)targetClasses.size();
            
            //Count Properties
            ArrayList<OntProperty> targetProps = reasoner.getModelPropList();
            int propCounter = 0;
            for(OntProperty p : targetProps){
                String p_uri = p.getURI();
                String p_label = p_uri.replace(p.getNameSpace(), "").trim();
                
                boolean covered = false;
                for (Map.Entry<String, String> entry : x3mlProp.entrySet()) {
                    String key = entry.getKey().trim(); //x3mlProperties label
                    if(p_label.equals(key)){
                        covered = true;
                        break;
                    }
                }
                
                boolean exclude = false;
                if(excludeList != null){
                    for(String excl : excludeList){
                        if(excl.equals(p_uri)){
                            exclude = true;
                            break;
                        }
                    }
                }
                
                if(covered || exclude){
                    propCounter++;
                }
            }
            double coveredProps = (double)propCounter;
            double totalProps = (double)targetProps.size();
            
            //Create percentages
            double tsPercentage = ((coveredClasses+coveredProps) / (totalClasses+totalProps)) * 100;
            this.CoveredClasses = Math.round((coveredClasses / totalClasses) * 100);
            this.CoveredProperties = Math.round((coveredProps / totalProps) * 100);
            this.CoveredTargetSchema = Math.round(tsPercentage);
        }
        catch(NullPointerException ex){
            logger.error("Problem on running Target Schema Direct Metric!", ex);
            this.CoveredClasses = 0;
            this.CoveredProperties = 0;
            this.CoveredTargetSchema = 0;
        }
    }
}
