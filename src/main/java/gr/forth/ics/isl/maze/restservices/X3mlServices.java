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
package gr.forth.ics.isl.maze.restservices;

import gr.forth.ics.isl.maze.source_schema.data.ERSourceSchema;
import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.Utils.X3MLUtils;
import gr.forth.ics.isl.maze.mapping_rules.ERMappingRules_Generator;
import gr.forth.ics.isl.maze.mapping_rules.data.ERSourceSchema_MappingRules;
import gr.forth.ics.isl.maze.source_schema.data.TreeSourceSchema;
import gr.forth.ics.isl.maze.coverage_metrics.CoverageMetrics_Generator;
import gr.forth.ics.isl.maze.coverage_metrics.MetricsExcludingEntities_Generator;
import gr.forth.ics.isl.maze.coverage_metrics.data.CoverageSourceSchemaList;
import gr.forth.ics.isl.maze.coverage_metrics.data.CoverageTargetSchemaList;
import gr.forth.ics.isl.maze.coverage_metrics.data.Metrics;
import gr.forth.ics.isl.maze.coverage_metrics.data.MetricsExcludingEntities;
import gr.forth.ics.isl.maze.instance.Instances_Generator;
import gr.forth.ics.isl.maze.instance.data.Instances;
import gr.forth.ics.isl.maze.mapping_rules.ComparisonMappingRules_Generator;
import gr.forth.ics.isl.maze.mapping_rules.TreeMappingRules_Generator;
import gr.forth.ics.isl.maze.mapping_rules.data.TreeSourceSchema_ComparisonMR;
import gr.forth.ics.isl.maze.mapping_rules.data.TreeSourceSchema_MappingRules;
import gr.forth.ics.isl.maze.source_schema.ERGenerator;
import gr.forth.ics.isl.maze.source_schema.TreeGenerator;
import gr.forth.ics.isl.maze.target_schema.TargetSchemaFile_Generator;
import gr.forth.ics.isl.maze.target_schema.data.MappingTargetSchemata;
import gr.forth.ics.isl.maze.target_schema.data.TargetSchemaFile;
import gr.forth.ics.isl.maze.versions.Versions_Generator;
import gr.forth.ics.isl.maze.versions.data.MappingVersions;
import gr.forth.ics.isl.maze.x3ml.TargetInfo;
import gr.forth.ics.isl.maze.x3ml.TargetSchema;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.w3c.dom.Document;


/**
 * REST Web Service
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
@Path("x3ml")
public class X3mlServices {
    private static Logger logger = Logger.getLogger(X3mlServices.class);
    
    public X3mlServices() {
    }
    
    @GET
    @Path("/singlemapping/{id}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public X3ML getSingleMapping(@PathParam("id") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            //x3ml = X3MLUtils.orderX3ML(x3ml);
            return x3ml;
        } catch (Exception ex) {
           logger.error("Cannot retreive X3ML",ex);
           return null; 
        }
    }
    
    @GET
    @Path("/singlemapping/plain/{id}")
    @Produces({MediaType.APPLICATION_XML})
    public Document getPlainSingleMapping(@PathParam("id") String id) {
        try {
            Document x3mlDoc = Utils.retreiveX3MLfile_toXML(id);
            x3mlDoc = Utils.sortX3MLDoument(x3mlDoc);
            return x3mlDoc;
        } catch (Exception ex) {
           logger.error("Cannot retreive X3ML",ex);
           return null; 
        }
    }
    
    @GET
    @Path("/singlemapping/coveragemetrics/{id}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Metrics getMappingOverview(@PathParam("id") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            CoverageMetrics_Generator og = new CoverageMetrics_Generator(x3ml, id);
            return og.getMETRICS();
        } catch (Exception ex) {
           logger.error("Cannot create overview of X3ML",ex);
           return null; 
        }
    }
    
    @GET
    @Path("/source_schema/er/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public ERSourceSchema erSourceSchema(@PathParam("mappid") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            String xmlName = x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            Document scDoc = Utils.retreiveFile_from3M_toXML(xmlName);
            ERGenerator eg = new ERGenerator();
            return eg.createER(scDoc);
        } catch (Exception ex) {
           logger.error("Cannot generage ER for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/source_schema/tree/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public TreeSourceSchema treeSourceSchema(@PathParam("mappid") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            String xmlName = x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            TreeGenerator tg = new TreeGenerator();
            return tg.createTree(xmlName);
        } catch (Exception ex) {
           logger.error("Cannot generage Tree Source Schema for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/target_schema/all/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public MappingTargetSchemata allTargetSchemata(@PathParam("mappid") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            MappingTargetSchemata mts = new MappingTargetSchemata();
            for(TargetInfo ti: x3ml.getInfo().getTargetInfo()){
                String schemaFile = ti.getTargetSchema().getSchemaFile();
                TargetSchema ts = ti.getTargetSchema();
                if(schemaFile!=null){
                    TargetSchemaFile_Generator tsfGenerator = new TargetSchemaFile_Generator();
                    TargetSchemaFile tsf = tsfGenerator.createTargetSchemaFile(schemaFile, ts);
                    mts.addTargetSchemaFile(tsf);
                }
            }
            return mts;
        } catch (Exception ex) {
           logger.error("Cannot generage Target Schemata Structure for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/mappingrules/er/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public ERSourceSchema_MappingRules erMappingRulesSourceSchema(@PathParam("mappid") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            String xmlName = x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            Document scDoc = Utils.retreiveFile_from3M_toXML(xmlName);
            ERMappingRules_Generator erRuleGen = new ERMappingRules_Generator();
            return erRuleGen.createERMappingRules(x3ml, scDoc);
        } catch (Exception ex) {
           logger.error("Cannot generage mapping rules (ER) for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/mappingrules/tree/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public TreeSourceSchema_MappingRules treeMappingRulesSourceSchema(@PathParam("mappid") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            String xmlName = x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            Document scDoc = Utils.retreiveFile_from3M_toXML(xmlName);
            TreeMappingRules_Generator treeRuleGen = new TreeMappingRules_Generator();
            return treeRuleGen.createTreeMappingRules(x3ml, scDoc);
        } catch (Exception ex) {
           logger.error("Cannot generage mapping rules (Tree) for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/source_schema/coveredelements/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public CoverageSourceSchemaList getCoveredElementsSourceSchema(@PathParam("mappid") String id) {
        try {
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            CoverageSourceSchemaList coveredElements = new CoverageSourceSchemaList();
            String sourceFile = x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            if(sourceFile!=null && !sourceFile.equals("")){
                ArrayList<String> ssRefList = X3MLUtils.findReferencesSourceSchema(x3ml);
                coveredElements.setCoveredElementsList(ssRefList);
            }
            return coveredElements;
        } catch (Exception ex) {
           logger.error("Cannot generage covered elements source schema for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/target_schema/coveredelements/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public CoverageTargetSchemaList getCoveredElementsTargetSchema(@PathParam("mappid") String id) {
        try {
            Document x3mlDocument = Utils.retreiveX3MLfile_toXML(id);
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            CoverageTargetSchemaList results = new CoverageTargetSchemaList();
            if (x3ml != null) {
                HashMap<String, String> x3mlClasses = X3MLUtils.findReferencedClasses(x3mlDocument, x3ml);
                HashMap<String, String> x3mlProp = X3MLUtils.findReferencedProperties(x3mlDocument, x3ml);
                for (Map.Entry<String, String> entry : x3mlClasses.entrySet()) {
                    String label = entry.getKey().trim(); //x3mlClasses label
                    String ns = entry.getValue().trim();
                    String uri = ns + label;
                    results.addCoveredClass(uri);
                }
                for (Map.Entry<String, String> entry : x3mlProp.entrySet()) {
                    String label = entry.getKey().trim(); //x3mlClasses label
                    String ns = entry.getValue().trim();
                    String uri = ns + label;
                    results.addCoveredProperty(uri);
                }
            }
            return results;
        } catch (Exception ex) {
           logger.error("Cannot generage covered elements target schema for Mapping:"+id,ex);
           return null; 
        }
    }
    
    
    @POST
    @Consumes({MediaType.TEXT_PLAIN})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/target_schema/metrics/excludinglist/{mappid}")
    public MetricsExcludingEntities excludinglistMetricsTS(String jsonString, @PathParam("mappid") String id){
        try {
            ArrayList<String> excludeList = new ArrayList<>();
            JSONArray jsonArray = new JSONArray(jsonString);
            for (int i = 0; i < jsonArray.length(); i++) {
                excludeList.add(jsonArray.getString(i));
            }
            
            excludeList = Utils.removeDublicatesFromArrayList(excludeList);
            for(String l : excludeList){
                l = l.trim();
            }
            
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            MetricsExcludingEntities_Generator generator = new MetricsExcludingEntities_Generator();
            return generator.targetSchemaMetrics(x3ml, id, excludeList);
        } catch (Exception ex) {
           logger.error("Cannot generage metric for exluding elements target schema:"+id,ex);
           return null; 
        }
    }
    
    @POST
    @Consumes({MediaType.TEXT_PLAIN})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/source_schema/metrics/excludinglist/{mappid}")
    public MetricsExcludingEntities excludinglistMetricsSS(String jsonString, @PathParam("mappid") String id){
        try {
            ArrayList<String> excludeList = new ArrayList<>();
            JSONArray jsonArray = new JSONArray(jsonString);
            for (int i = 0; i < jsonArray.length(); i++) {
                excludeList.add(jsonArray.getString(i));
            }
            
            excludeList = Utils.removeDublicatesFromArrayList(excludeList);
            for(String l : excludeList){
                l = l.trim();
            }
            
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            MetricsExcludingEntities_Generator generator = new MetricsExcludingEntities_Generator();
            return generator.sourceSchemaMetrics(x3ml, id, excludeList);
        } catch (Exception ex) {
           logger.error("Cannot generage metric for exluding elements source schema:"+id,ex);
           return null; 
        }
    }
    
    
    @GET
    @Path("/instances/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Instances getInstancesData(@PathParam("mappid") String id) {
        try {
            Instances results = new Instances();
            X3ML x3ml = Utils.unmarshal_X3ML_WithID(id);
            
            String recordsFile = x3ml.getInfo().getExampleDataInfo().getExampleDataTargetRecord().getvalue();
            if(recordsFile==null || recordsFile.equals("")){
                recordsFile = x3ml.getInfo().getExampleDataInfo().getExampleDataTargetRecord().getRdfLink();
            }
            
            if(recordsFile!=null && !recordsFile.equals("")){
                Instances_Generator generator = new Instances_Generator();
                results = generator.createInstancesData(recordsFile);
            }
            return results;
        } catch (Exception ex) {
           logger.error("Cannot generage instances data for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/graphical_comparison/{mappid1}/{mappid2}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public TreeSourceSchema_ComparisonMR getGraphicalComparison(
            @PathParam("mappid1") String id1, 
            @PathParam("mappid2") String id2) {
        try {
            X3ML x3ml1 = Utils.unmarshal_X3ML_WithID(id1);
            X3ML x3ml2 = Utils.unmarshal_X3ML_WithID(id2);
            String xmlName1 = x3ml1.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            String xmlName2 = x3ml2.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
            
            if(xmlName1!=null && xmlName2!=null && !xmlName1.equals("") && !xmlName2.equals("")){
                if(xmlName1.equals(xmlName2)){
                    String xmlName = x3ml1.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
                    Document scDoc = Utils.retreiveFile_from3M_toXML(xmlName);
                    ComparisonMappingRules_Generator generator = new ComparisonMappingRules_Generator();
                    return generator.createComparisonMappingRules(x3ml1, x3ml2, scDoc);
                }
            }
            return null;
        } catch (Exception ex) {
            logger.error("Cannot generage graphical_comparison data for Mapping:" + id1 + ", " + id2, ex);
            return null;
        }
    }
    
    
    @GET
    @Path("/versions/{mappid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public MappingVersions getMappingVersions(@PathParam("mappid") String id) {
        try {
            Versions_Generator versGen = new Versions_Generator(id);
            return versGen.createVersions();
        } catch (Exception ex) {
           logger.error("Cannot get versions for Mapping:"+id,ex);
           return null; 
        }
    }
    
    @GET
    @Path("/versions/mapping/{mappid}/{versid}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Document getDirectMappingVersions(@PathParam("mappid") String id, 
            @PathParam("versid") String versid) {
        try {
            Document document = Utils.retreiveVersionX3ML_from3M_toXML(id, versid);
            document = Utils.sortX3MLDoument(document);
            return document;
        } catch (Exception ex) {
           logger.error("Cannot get versioned X3ML for Mapping:"+id,ex);
           return null; 
        }
    }
    
}
