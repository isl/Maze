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
package gr.forth.ics.isl.maze.target_schema;

import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntProperty;
import gr.forth.ics.isl.maze.target_schema.data.TS_Class;
import gr.forth.ics.isl.maze.target_schema.data.TS_Property;
import gr.forth.ics.isl.maze.target_schema.data.TargetSchemaFile;
import gr.forth.ics.isl.maze.target_schema.data.TargetSchemaMetrics;
import gr.forth.ics.isl.maze.x3ml.TargetSchema;
import java.util.ArrayList;
import org.apache.log4j.Logger;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class TargetSchemaFile_Generator {

    private static Logger logger = Logger.getLogger(TargetSchemaFile_Generator.class);
    private TargetSchemaFile tsFile;
    private TargetSchemaReasoner tsReasoner;

    public TargetSchemaFile createTargetSchemaFile(String schemaFile, TargetSchema targetSchema) {
        try {
            this.tsFile = new TargetSchemaFile();
            this.tsReasoner = new TargetSchemaReasoner(schemaFile);
            saveFileParameters(schemaFile, targetSchema);
            saveClassesOfFile();
            savePropertiesOfFile();
            saveFileMetrics();
            return this.tsFile;
        } catch (Exception ex) {
            logger.error("Cannot generate target schema file for: " + schemaFile, ex);
            return null;
        }
    }

    private void saveFileParameters(String schemaFile, TargetSchema currentTS) {
        this.tsFile.setFileName(schemaFile);
        this.tsFile.setName(currentTS.getValue());
        this.tsFile.setType(currentTS.getType());
        this.tsFile.setVersion(currentTS.getVersion());
    }

    private void saveFileMetrics() {
        TargetSchemaMetrics metrics = new TargetSchemaMetrics();

        ArrayList<OntClass> classList = this.tsReasoner.getModelClassesList(Boolean.FALSE);
        metrics.setClassCount(classList.size());

        ArrayList<OntProperty> propsList = this.tsReasoner.getModelPropList();
        metrics.setPropertyCount(propsList.size());

        metrics.setSubClassCount(0);
        metrics.setSubPropertyCount(0);

        this.tsFile.setTargetSchemaMetrics(metrics);
    }

    private void saveClassesOfFile() {
        try {
          //  System.out.println("--------------------CLASSES---------------------------------------------");
            ArrayList<OntClass> classesList = this.tsReasoner.getModelClassesList(Boolean.FALSE);
            //double allClassesSize = (double)this.tsReasoner.getModelClassesList(Boolean.TRUE).size();
            if (classesList != null) {
                for (OntClass c : classesList) {
                    // System.out.println("class- > "+c.getURI() );
                    if (c.getURI() != null) {
                        TS_Class tsClass = new TS_Class();
                        tsClass.setUri(c.getURI());
                        String label = c.getURI().replace(c.getNameSpace(), "");
                        tsClass.setLabel(label);
                        double strength = this.tsReasoner.getSubclassesOfClass(c, Boolean.TRUE).size();
                        tsClass.setSize(strength);
                        String comment;
                        try {
                            comment = c.getComment(null);
                            if (comment.length() > 300) {
                                comment = comment.substring(0, 200) + "...";
                            }
                        } catch (NullPointerException e) {
                            comment = "";
                        }
                        tsClass.setComment(comment);
                        tsClass.setNamespace(c.getNameSpace());
                        try {
                            ArrayList<String> subClassesList = this.tsReasoner.getSubclassesOfClass(c, Boolean.FALSE);
                            tsClass.setSubclasses(subClassesList);
                        } catch (Exception e) {
                            logger.error("Cannot find subclasses of " + c.getURI(), e);
                        }
                        tsClass.setTriangles(this.tsReasoner.searchForTriangles(c));
                        this.tsFile.addClass(tsClass);
                    }
                }
            }
        } catch (Exception ex) {
            logger.error("Cannot find classes of target schema.", ex);
        }
    }

    private void savePropertiesOfFile() {
        ArrayList<OntProperty> propList = this.tsReasoner.getModelPropList();
        try {
            for (OntProperty p : propList) {
                TS_Property tsProp = new TS_Property();
                tsProp.setUri(p.getURI());
                String label = p.getURI().replace(p.getNameSpace(), "");
                tsProp.setLabel(label);
                tsProp.setNamespace(p.getNameSpace());
                String comment;
                try {
                    comment = p.getComment(null);
                    if (comment.length() > 200) {
                        comment = comment.substring(0, 200) + "...";
                    }
                } catch (NullPointerException e) {
                    comment = "";
                }
                tsProp.setComment(comment);
                tsProp.setSubproperties(this.tsReasoner.getSubpropertiesOfProperty(p, Boolean.FALSE));

                tsProp.setDomain(this.tsReasoner.getDomainOfProperty(p));
                tsProp.setRange(this.tsReasoner.getRangeOfProperty(p));
                this.tsFile.addProperty(tsProp);
            }
        } catch (Exception ex) {
            logger.error("Cannot find properties of target schema.", ex);
        }
    }
}
