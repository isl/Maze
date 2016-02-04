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
package gr.forth.ics.isl.maze.versions;

import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.versions.data.MappingVersions;
import gr.forth.ics.isl.maze.versions.data.Version;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class Versions_Generator {
    private static Logger logger = Logger.getLogger(Versions_Generator.class);
    private String MappingID;
    private Document versDocument;
    private MappingVersions mappingVersions;
    
    public Versions_Generator(String ID){
        this.mappingVersions = new MappingVersions();
        this.MappingID = ID;
        this.versDocument = Utils.retreiveVersions_from3M_toXML(ID);
    } 

    public MappingVersions createVersions() {
        try{
            NodeList nList = this.versDocument.getElementsByTagName("result");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    Version version = createVersionFromElement(eElement);
                    this.mappingVersions.addVersion(version);
                }
            }
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(this.MappingID);
            this.mappingVersions.setMappingID(this.MappingID);
            this.mappingVersions.setMappingTitle(x3ml.getInfo().getTitle());
            return this.mappingVersions;
        }
        catch(Exception ex){
            logger.error("Cannot generate vesions for Mapping: "+this.MappingID, ex);
            return null;
        }
    }
    
    private Version createVersionFromElement(Element eElement){
        Version version = new Version();
        
        version.setVersionId(eElement.getElementsByTagName("versionId").item(0).getTextContent());
        version.setVersionUser(eElement.getElementsByTagName("versionUser").item(0).getTextContent());
        version.setVersionDate(eElement.getElementsByTagName("versionDate").item(0).getTextContent());
        version.setComment(eElement.getElementsByTagName("comment").item(0).getTextContent());
        
        return version;
    }
    
}
