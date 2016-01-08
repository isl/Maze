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
package gr.forth.ics.isl.maze.target_schema.data;

import gr.forth.ics.isl.maze.target_schema.TargetSchemaFile_Generator;
import gr.forth.ics.isl.maze.x3ml.TargetInfo;
import gr.forth.ics.isl.maze.x3ml.TargetSchema;
import gr.forth.ics.isl.maze.x3ml.X3ML;
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
    "TargetSchemaFile"
})
@XmlRootElement(name = "MappingTargetSchemata")
public class MappingTargetSchemata {
    
    private static Logger logger = Logger.getLogger(MappingTargetSchemata.class);
    private ArrayList<TargetSchemaFile> TargetSchemaFile;
    
    public MappingTargetSchemata(X3ML x3mlObj){
        for(TargetInfo ti: x3mlObj.getInfo().getTargetInfo()){
            String schemaFile = ti.getTargetSchema().getSchemaFile();
            TargetSchema ts = ti.getTargetSchema();
            if(schemaFile!=null){
                TargetSchemaFile_Generator tsfGenerator = new TargetSchemaFile_Generator();
                TargetSchemaFile tsf = tsfGenerator.createTargetSchemaFile(schemaFile, ts);
                this.addTargetSchemaFile(tsf);
            }
        }
    }
    
    public MappingTargetSchemata(){
        
    }

    public ArrayList<TargetSchemaFile> getMappingTargetSchemata() {
        return this.TargetSchemaFile;
    }

    public void setMappingTargetSchemata(ArrayList<TargetSchemaFile> MappingTargetSchemata) {
        this.TargetSchemaFile = MappingTargetSchemata;
    }
    
    public void addTargetSchemaFile(TargetSchemaFile tsf) {
        if (this.TargetSchemaFile == null) {
            this.TargetSchemaFile = new ArrayList<TargetSchemaFile>();
        }
        this.TargetSchemaFile.add(tsf);
    }
    
    public ArrayList<String> getSubClassesOfClass(String classURI){
        ArrayList<String> results = new ArrayList<>();
        try{
            for(TargetSchemaFile tf: this.TargetSchemaFile){
                for(TS_Class c: tf.getClasses()){
                    if(c.getUri().equals(classURI)){
                        results.addAll(c.getSubclasses());
                    }
                }
            }
            return results;
        }
        catch(NullPointerException ex){
            logger.error("MappingTargetSchemata[ERROR]: Class "+classURI+" Not Found!", ex);
            return new ArrayList<>();
        }
    }
    
    public ArrayList<String> getSubPropertiesOfProp(String propURI){
        ArrayList<String> results = new ArrayList<>();
        try{
            for(TargetSchemaFile tf: this.TargetSchemaFile){
                for(TS_Property p: tf.getProperties()){
                    if(p.getUri().equals(propURI)){
                        results.addAll(p.getSubproperties());
                    }
                }
            }
            return results;
        }
        catch(NullPointerException ex){
            logger.error("MappingTargetSchemata[ERROR]: Property "+propURI+" Not Found!", ex);
            return new ArrayList<>();
        }
    }
}
