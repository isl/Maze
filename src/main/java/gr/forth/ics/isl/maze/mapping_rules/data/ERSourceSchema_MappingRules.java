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
package gr.forth.ics.isl.maze.mapping_rules.data;

import gr.forth.ics.isl.maze.source_schema.data.*;
import java.util.ArrayList;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "tables",
    "mappingRulesSchema"
})
@XmlRootElement(name = "ERSourceSchema_MappingRules")
public class ERSourceSchema_MappingRules{
    private ArrayList<ERTable_MappingRules> tables;
    private MappingRulesSchema mappingRulesSchema;

    public MappingRulesSchema getMappingRulesSchema() {
        return mappingRulesSchema;
    }

    public void setMappingRulesSchema(MappingRulesSchema mappingRulesSchema) {
        this.mappingRulesSchema = mappingRulesSchema;
    }

    public ArrayList<ERTable_MappingRules> getTables() {
        return tables;
    }

    public void setTables(ArrayList<ERTable_MappingRules> tables) {
        this.tables = tables;
    }
    
    public void addTable(ERTable_MappingRules table) {
        if (this.tables == null) {
            this.tables = new ArrayList<>();
        }
        this.tables.add(table);
    }
    
    public void copyTablesFromER(ERSourceSchema ER){
        for(ERTable t: ER.getTables()){
            ERTable_MappingRules ruleTable = new ERTable_MappingRules();
            
            //Set Attributes
            for(String attr: t.getAttributes()){
                ERAttribute_MappingRule ruleAttr = new ERAttribute_MappingRule();
                ruleAttr.setHasCovered(Boolean.FALSE);
                ruleAttr.setName(attr);
                ruleTable.addAttribute(ruleAttr);
            }
            
            // clone other properties
            ruleTable.setHasCovered(Boolean.FALSE);
            ruleTable.setTableName(t.getTableName());
            ruleTable.setType(t.getType());
            
            if(this.tables == null){
                this.tables = new ArrayList<>();
            }
            this.tables.add(ruleTable);
        }
    }
}
