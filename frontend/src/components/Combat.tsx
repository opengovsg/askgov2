import React, { FC, useState } from 'react';


import { Layout, Select, Row, Col, Typography, Space, Table, Tabs } from 'antd';
import {combatants, Combatant} from "../data/combatant";
import {Calculators} from "../util/prob";

const { Header, Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

interface MyState {
  combatant_a?: Combatant,
  combatant_b?: Combatant,
}


export const Combat: FC = () => {
  const options = combatants.map((combatant) =>
    <Option key={combatant.name} value={combatant.name}>{combatant.name}</Option>
  );

  const [{combatant_a, combatant_b}, setState] = useState<MyState>({});

  interface TableColumn {
    title: string,
    dataIndex: string,
    key: string,
    ellipsis?: boolean,
    width?: string | number,
  }
  interface TableRow {
    key: string,
    [attack: string]: string
  }

  let columns: TableColumn[] = [];
  let data: { etd: TableRow[], ead: TableRow[], ena: TableRow[], eda: TableRow[] } = {
    etd: [],
    ead: [],
    ena: [],
    eda: [],
  };

  if (combatant_a && combatant_b) {
    const aAttacks = Calculators.matchupTables(combatant_a, combatant_b);
    const bAttacks = Calculators.matchupTables(combatant_b, combatant_a);
    // Order: E[Td], E[Ad], E[Na], E[Da] (etd, enad, expectedAttacks, expectedDamage)

    columns.push({
      title: `${combatant_a.name} Attacking`,
      dataIndex: 'a_attack',
      key: 'a_attack',
      ellipsis: true,
      width: 5,
    });
    for (let defense of aAttacks.defenses) {
      columns.push({
        title: defense,
        dataIndex: `b_defense ${defense}`,
        key: `b_defense ${defense}`,
        ellipsis: true,
        width: 2,
      });
    }
    columns.push({
      title: "",
      dataIndex: "spacer",
      key: "spacer",
      width: 2,
    });
    columns.push({
      title: `${combatant_b.name} Attacking`,
      dataIndex: 'b_attack',
      key: 'b_attack',
      ellipsis: true,
      width: 5,
    });
    for (let defense of bAttacks.defenses) {
      columns.push({
        title: defense,
        dataIndex: `a_defense ${defense}`,
        key: `a_defense ${defense}`,
        ellipsis: true,
        width: 2,
      });
    }

    // etd: [],
    //   ead: [],
    //   ena: [],
    //   eda: [],
    for (let i = 0; i < Math.max(aAttacks.attacks.length, bAttacks.attacks.length); i++) {
      let etdRow: TableRow = { key: `${combatant_a.name}|${combatant_b.name}|${i}` }
      let eadRow: TableRow = { key: `${combatant_a.name}|${combatant_b.name}|${i}` }
      let enaRow: TableRow = { key: `${combatant_a.name}|${combatant_b.name}|${i}` }
      let edaRow: TableRow = { key: `${combatant_a.name}|${combatant_b.name}|${i}` }

      if (i < aAttacks.attacks.length) {
        etdRow.a_attack = aAttacks.attacks[i];
        eadRow.a_attack = aAttacks.attacks[i];
        enaRow.a_attack = aAttacks.attacks[i];
        edaRow.a_attack = aAttacks.attacks[i];
        for (let j = 0; j < aAttacks.defenses.length; j++) {
          etdRow[`b_defense ${aAttacks.defenses[j]}`] = aAttacks.etd[i][j].toFixed(2);
          eadRow[`b_defense ${aAttacks.defenses[j]}`] = aAttacks.enad[i][j].toFixed(2);
          enaRow[`b_defense ${aAttacks.defenses[j]}`] = aAttacks.expectedAttacks[i].toFixed(2);
          edaRow[`b_defense ${aAttacks.defenses[j]}`] = aAttacks.expectedDamage[i][j].toFixed(2);
        }
      }
      if (i < bAttacks.attacks.length) {
        etdRow.b_attack = bAttacks.attacks[i];
        eadRow.b_attack = bAttacks.attacks[i];
        enaRow.b_attack = bAttacks.attacks[i];
        edaRow.b_attack = bAttacks.attacks[i];
        for (let j = 0; j < bAttacks.defenses.length; j++) {
          etdRow[`a_defense ${bAttacks.defenses[j]}`] = bAttacks.etd[i][j].toFixed(2);
          eadRow[`a_defense ${bAttacks.defenses[j]}`] = bAttacks.enad[i][j].toFixed(2);
          enaRow[`a_defense ${bAttacks.defenses[j]}`] = bAttacks.expectedAttacks[i].toFixed(2);
          edaRow[`a_defense ${bAttacks.defenses[j]}`] = bAttacks.expectedDamage[i][j].toFixed(2);
        }
      }
      data.etd.push(etdRow);
      data.ead.push(eadRow);
      data.ena.push(enaRow);
      data.eda.push(edaRow);
    }
  }

  return (
    <div className="site-layout-content">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row justify="center" style={{ margin: '10px 0' }}>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Select a combatant"
              onChange={(combatant: string) => {setState({
                combatant_a: combatants.find((c) => ( c.name === combatant ? true : false )),
                combatant_b,
              })}}
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                (option!.value as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options}
            </Select>
          </Col>
          <Col span={2} style={{ textAlign:"center", padding: "4px 0" }}>vs</Col>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Select a combatant"
              onChange={(combatant: string) => {setState({
                combatant_a,
                combatant_b: combatants.find((c) => ( c.name === combatant ? true : false )),
              })}}
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                (option!.value as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options}
            </Select>
          </Col>
        </Row>
      </Space>
      {/*<Typography.Title level={2}>E[td]</Typography.Title>*/}
      <Tabs defaultActiveKey="1" size="large" style={{ marginBottom: 32 }}>
        <TabPane tab="E[td]" key="1">
          <Table columns={columns} dataSource={data.etd} size="middle" pagination={{ position: [] }}/>
        </TabPane>
        <TabPane tab="E[Ad]" key="2">
          <Table columns={columns} dataSource={data.ead} size="middle" pagination={{ position: [] }}/>
        </TabPane>
        <TabPane tab="E[Na]" key="3">
          <Table columns={columns} dataSource={data.ena} size="middle" pagination={{ position: [] }}/>
        </TabPane>
        <TabPane tab="E[Da]" key="4">
          <Table columns={columns} dataSource={data.eda} size="middle" pagination={{ position: [] }}/>
        </TabPane>
      </Tabs>

    </div>
  );
}

