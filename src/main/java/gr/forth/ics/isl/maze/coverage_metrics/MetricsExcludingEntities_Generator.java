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
package gr.forth.ics.isl.maze.coverage_metrics;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.Utils.X3MLUtils;
import gr.forth.ics.isl.maze.coverage_metrics.data.ExcludingEntity;
import gr.forth.ics.isl.maze.coverage_metrics.data.Metrics;
import gr.forth.ics.isl.maze.coverage_metrics.data.MetricsExcludingEntities;
import gr.forth.ics.isl.maze.coverage_metrics.data.OverviewMetrics;
import gr.forth.ics.isl.maze.coverage_metrics.data.SSDirectMetric;
import gr.forth.ics.isl.maze.coverage_metrics.data.SSMetrics;
import gr.forth.ics.isl.maze.coverage_metrics.data.SingleTSMetrics;
import gr.forth.ics.isl.maze.coverage_metrics.data.TSDirectMetric;
import gr.forth.ics.isl.maze.coverage_metrics.data.TSLeavesMetric;
import gr.forth.ics.isl.maze.coverage_metrics.data.TSMetrics;
import gr.forth.ics.isl.maze.source_schema.TreeGenerator;
import gr.forth.ics.isl.maze.source_schema.data.TreeSourceSchema;
import gr.forth.ics.isl.maze.target_schema.TargetSchemaReasoner;
import gr.forth.ics.isl.maze.x3ml.TargetInfo;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.w3c.dom.Document;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class MetricsExcludingEntities_Generator {
    
    private Metrics METRICS;
    private ArrayList<ExcludingEntity> excludingEntities;
    private X3ML x3ml;
    private Document x3mlDocument;
    
    public MetricsExcludingEntities sourceSchemaMetrics(X3ML x3ml, String x3mlId, ArrayList<String> exlcudingList){
        this.x3ml = x3ml;
        this.METRICS = new Metrics();
        this.excludingEntities = new ArrayList<>();
        this.x3mlDocument = Utils.retreiveX3MLfile_toXML(x3mlId);
        
        TreeGenerator treeGenerator = new TreeGenerator();
        String sourceFile = this.x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
        
        SSMetrics sSMetrics = new SSMetrics();
        SSDirectMetric sSDirectMetric = new SSDirectMetric();
        //SSLeavesMetric sSLeavesMetric = new SSLeavesMetric(); not implemented
        if(sourceFile!=null && !sourceFile.equals("")){
            TreeSourceSchema tree = treeGenerator.createTree(sourceFile);
            ArrayList<String> ssRefList = X3MLUtils.findReferencesSourceSchema(this.x3ml);
            sSDirectMetric.RUN_METRIC(tree, ssRefList, exlcudingList);
            //sSLeavesMetric.RUN_METRIC(tree, ssRefList); not implemented
            
            if(exlcudingList!=null){
                for(String excl: exlcudingList){
                    ExcludingEntity entity = new ExcludingEntity();
                    entity.setName(excl);
                    boolean covered = false;
                    for(String ref : ssRefList){
                        if(ref.equals(excl)){
                            covered = true;
                            break;
                        }
                    }
                    entity.setCovered(covered);
                    this.excludingEntities.add(entity);
                }
            }
        }
        sSMetrics.setsSDirectMetric(sSDirectMetric);
        
        OverviewMetrics overviewMetrics = new OverviewMetrics();
        overviewMetrics.setsSMetrics(sSMetrics);
        this.METRICS.setOverviewMetrics(overviewMetrics);
        
        MetricsExcludingEntities results = new MetricsExcludingEntities();
        results.setExcludingEntities(this.excludingEntities);
        results.setMetrics(this.METRICS);
        return results;
    }
    
    public MetricsExcludingEntities targetSchemaMetrics(X3ML x3ml, String x3mlId, ArrayList<String> exlcudingList){
        this.x3ml = x3ml;
        this.METRICS = new Metrics();
        this.excludingEntities = new ArrayList<>();
        this.x3mlDocument = Utils.retreiveX3MLfile_toXML(x3mlId);
        
        
        //Run metrics for all target schemata
        //******************************
        List<TargetInfo> targetFiles = this.x3ml.getInfo().getTargetInfo();
        Model fullModel = ModelFactory.createDefaultModel();
        for(TargetInfo ti: targetFiles){
            String schemaFile = ti.getTargetSchema().getSchemaFile();
            if(schemaFile != null){
                Model curModel = Utils.retreiveOntology_from3M_toBaseOntModel(schemaFile);
                fullModel.add(curModel);
            }
        }
        TargetSchemaReasoner reasoner = new TargetSchemaReasoner(fullModel);
        HashMap<String, String> x3mlClasses = X3MLUtils.findReferencedClasses(this.x3mlDocument, this.x3ml);
        HashMap<String, String> x3mlProp = X3MLUtils.findReferencedProperties(this.x3mlDocument, this.x3ml);
        
        TSMetrics tSMetrics = new TSMetrics();
        TSDirectMetric tSDirectMetric = new TSDirectMetric();
        tSDirectMetric.RUN_METRIC(reasoner, x3mlClasses, x3mlProp, exlcudingList);
        
        TSLeavesMetric tSLeavesMetric = new TSLeavesMetric();
        tSLeavesMetric.RUN_METRIC(reasoner, x3mlClasses, x3mlProp, exlcudingList);
        tSMetrics.setDirectMetric(tSDirectMetric);
        tSMetrics.setLeavesMetric(tSLeavesMetric);
        
        OverviewMetrics overviewMetrics = new OverviewMetrics();
        overviewMetrics.settSMetrics(tSMetrics);
        this.METRICS.setOverviewMetrics(overviewMetrics);
        
        runTSMetrics(exlcudingList);
        
        if(exlcudingList!=null){
            for(String excl: exlcudingList){
                ExcludingEntity entity = new ExcludingEntity();
                entity.setName(excl);
                entity.setCovered(uriIsCovered(excl, x3mlClasses, x3mlProp));
                this.excludingEntities.add(entity);
            }
        }
        
        MetricsExcludingEntities results = new MetricsExcludingEntities();
        results.setExcludingEntities(this.excludingEntities);
        results.setMetrics(this.METRICS);
        return results;
    }
    
    
    private void runTSMetrics(ArrayList<String> exlcudingList){
        
        ArrayList<SingleTSMetrics> singleTSMetricsList = new ArrayList<>();
        HashMap<String, String> x3mlClasses = X3MLUtils.findReferencedClasses(this.x3mlDocument, this.x3ml);
        HashMap<String, String> x3mlProp = X3MLUtils.findReferencedProperties(this.x3mlDocument, this.x3ml);
        
            List<TargetInfo> targetFiles = this.x3ml.getInfo().getTargetInfo();
            for(TargetInfo ti: targetFiles){
                String schemaFile = ti.getTargetSchema().getSchemaFile();
                if(schemaFile != null){
                    SingleTSMetrics singleTSMetrics = new SingleTSMetrics();

                    //Set info fields
                    singleTSMetrics.setFileName(schemaFile);
                    singleTSMetrics.setName(ti.getTargetSchema().getvalue());
                    singleTSMetrics.setType(ti.getTargetSchema().getType());
                    singleTSMetrics.setVersion(ti.getTargetSchema().getVersion());
                    
                    //create reasoner
                    TargetSchemaReasoner reasoner = new TargetSchemaReasoner(schemaFile);
                    
                    //run metrics
                    TSMetrics tSMetrics = new TSMetrics();
                    TSDirectMetric tSDirectMetric = new TSDirectMetric();
                    tSDirectMetric.RUN_METRIC(reasoner, x3mlClasses, x3mlProp, exlcudingList);
                    TSLeavesMetric tSLeavesMetric = new TSLeavesMetric();
                    tSLeavesMetric.RUN_METRIC(reasoner, x3mlClasses, x3mlProp, exlcudingList);
                    tSMetrics.setDirectMetric(tSDirectMetric);
                    tSMetrics.setLeavesMetric(tSLeavesMetric);
                    
                    singleTSMetrics.settSMetrics(tSMetrics);
                    singleTSMetricsList.add(singleTSMetrics);
                }
            }
        
        this.METRICS.setSingleTSMetricsList(singleTSMetricsList);
    }
    
    private boolean uriIsCovered(String uri, HashMap<String, String> x3mlClasses, HashMap<String, String> x3mlProp){
        
        HashMap<String, String> all = new HashMap<>();
        all.putAll(x3mlClasses);
        all.putAll(x3mlProp);
        
        boolean covered = false;
        for (Map.Entry<String, String> entry : all.entrySet()) {
            String key = entry.getKey().trim(); // label
            if(uri.contains(key)) {
                covered = true;
                break;
            }
        }
        
        return covered;
    }
    
    
}
