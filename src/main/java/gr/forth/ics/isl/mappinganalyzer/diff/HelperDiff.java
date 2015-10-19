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
package gr.forth.ics.isl.mappinganalyzer.diff;

import gr.forth.ics.isl.mappinganalyzer.x3ml.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Nikos
 */
public class HelperDiff {
    
    
    public static MappingDiff findMappings(X3ML x3ml1, X3ML x3ml2){
        try{
            MappingDiff mapDiff = new MappingDiff();
            int size1 = x3ml1.getMappings().getMapping().size();
            int size2 = x3ml2.getMappings().getMapping().size();
            if(size1<size2){
                X3ML temp = x3ml1;
                x3ml1 = x3ml2;
                x3ml2 = temp;
            }
            List<Mapping> mapList1 = x3ml1.getMappings().getMapping();
            List<Mapping> mapList2 = x3ml2.getMappings().getMapping();
            mapDiff.getCommon().addAll(findCommonMappings(mapList1, mapList2));
            mapDiff.getFirstMapping().addAll(createMappingCorrelations(x3ml1.getMappings(), x3ml1.getInfo().getTitle()));
            mapDiff.getSecondMapping().addAll(createMappingCorrelations(x3ml2.getMappings(), x3ml2.getInfo().getTitle()));
            MappingDiff fixed = new MappingDiff();
            fixed = fixMappingDiff(mapDiff);
            return mapDiff;
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    private static ArrayList<Correlation> findCommonMappings(List<Mapping> mapList1, List<Mapping> mapList2){
        ArrayList<Correlation> mapDiff = new ArrayList<Correlation>();
        for(Mapping m1: mapList1){
                for(Mapping m2: mapList2){
                    String sourceNode1 = m1.getDomain().getSourceNode();
                    String sourceNode2 = m2.getDomain().getSourceNode();
                    if(sourceNode1.equals(sourceNode2)){
                        Correlation cor = new Correlation();
                        cor.setStartNode("Mapping");
                        cor.setRelation("source_node");
                        cor.setEndNode(sourceNode1);
                        mapDiff.add(cor);
                        break;
                    }
                }
            }
        return mapDiff;
    }
    
    private static ArrayList<Correlation> createMappingCorrelations(Mappings maps, String title){
         ArrayList<Correlation> list = new ArrayList<Correlation>();
        for(Mapping m: maps.getMapping()){
            Correlation cor = new Correlation();
            cor.setStartNode(title);
            cor.setRelation("source_node");
            cor.setEndNode(m.getDomain().getSourceNode());
            list.add(cor);
        }
        return list;
    }
    
    private static boolean correlationExists(MappingDiff diff, Correlation cor){
        for(Correlation c: diff.getCommon()){
            if(c.getEndNode().equals(cor.getEndNode())){
                if(c.getRelation().equals(cor.getRelation())){
                    if(c.getStartNode().equals(cor.getStartNode())){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    private static MappingDiff fixMappingDiff(MappingDiff data){
        boolean commonEmpty = data.getCommon().isEmpty();
        ArrayList<Correlation> valuesToRemove1 = new ArrayList<Correlation>();
        ArrayList<Correlation> valuesToRemove2 = new ArrayList<Correlation>();
        try{
            for(Correlation c: data.getCommon()){
                for(Correlation c1: data.getFirstMapping()){
                    if(c.getEndNode().equals(c1.getEndNode())){
                        valuesToRemove1.add(c1);
                    }
                    else{
                        c1.setStartNode("Mapping");
                    }
                }
                for(Correlation c1: data.getSecondMapping()){
                    if(c.getEndNode().equals(c1.getEndNode())){
                        valuesToRemove2.add(c1);
                    }
                    else{
                        c1.setStartNode("Mapping");
                    }
                }
            }
            data.getFirstMapping().removeAll(valuesToRemove1);
            data.getSecondMapping().removeAll(valuesToRemove2);
            return data;
        }
        catch(Exception ex){
            ex.printStackTrace();
            return null;
        }
        
    }
    
    public static MappingDiff findSourceNodes(X3ML x3ml1, X3ML x3ml2, String sourceNode){
        try{
            MappingDiff data = new MappingDiff();
            Mapping currentMap1 = null;
            Mapping currentMap2 = null;
            for(Mapping m: x3ml1.getMappings().getMapping()){
                if(m.getDomain().getSourceNode().equals(sourceNode)){
                    currentMap1 = new Mapping();
                    currentMap1 = m;
                }
            }
            for(Mapping m: x3ml2.getMappings().getMapping()){
                if(m.getDomain().getSourceNode().equals(sourceNode)){
                    currentMap2 = new Mapping();
                    currentMap2 = m;
                }
            }
            if(currentMap1!=null){
                for(Link l: currentMap1.getLink()){
                    Correlation cor = new Correlation();
                    cor.setStartNode(sourceNode);
                    cor.setRelation("link");
                    cor.setEndNode(l.getPath().getSourceRelation().getRelation());
                    data.getFirstMapping().add(cor);
                }
            }
            if(currentMap2!=null){
                for(Link l: currentMap2.getLink()){
                    Correlation cor = new Correlation();
                    cor.setStartNode(sourceNode);
                    cor.setRelation("link");
                    cor.setEndNode(l.getPath().getSourceRelation().getRelation());
                    data.getSecondMapping().add(cor);
                }
            }
            
            return fixSourceNodes(data);
        }catch(Exception ex){
            ex.printStackTrace();
            return null;
        }
    }
    
    private static MappingDiff fixSourceNodes(MappingDiff data){
        try{
            ArrayList<Correlation> itemsToMove1 = new ArrayList<Correlation>();
            ArrayList<Correlation> itemsToMove2 = new ArrayList<Correlation>();
            for(Correlation c1: data.getFirstMapping()){
                for(Correlation c2: data.getSecondMapping()){
                    if(equalCorrelation(c1, c2)){
                        itemsToMove1.add(c1);
                    }
                }
            }
            data.getCommon().addAll(itemsToMove1);
            data.getFirstMapping().removeAll(itemsToMove1);
            data.getSecondMapping().removeAll(itemsToMove1);
            for(Correlation c1: data.getSecondMapping()){
                for(Correlation c2: data.getFirstMapping()){
                    if(equalCorrelation(c1, c2)){
                        itemsToMove2.add(c1);
                    }
                }
            }
            data.getCommon().addAll(itemsToMove2);
            data.getFirstMapping().removeAll(itemsToMove2);
            data.getSecondMapping().removeAll(itemsToMove2);
            return data;
            
        }catch(Exception ex){
            ex.printStackTrace();
            return null;
        }
    }
    
    private static boolean equalCorrelation(Correlation c1, Correlation c2){
        if(c1.getStartNode().equals(c2.getStartNode())){
            if(c1.getRelation().equals(c2.getRelation())){
                if(c1.getEndNode().equals(c2.getEndNode())){
                    return true;
                }
            }
        }
        return false;
    }
    
    
}
