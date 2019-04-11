import React, { PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import { Form, Button, Divider, Card, Row, Col, Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formRecord: { a: 0, b: 0 }, // 表单数据（被加数，加数）
      result: 0, // 运算结果（求和）
    };
  }

  render() {
    const { form } = this.props;
    const { formRecord, result } = this.state;

    return (
      <PageHeaderWrapper title={formatMessage({ id: '普通' })}>
        <Card bordered={false}>
          <Form layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <Form.Item label={formatMessage({ id: '被加数' })}>
                  {form.getFieldDecorator('a', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: '请输入' }) + formatMessage({ id: '被加数' }),
                      },
                    ],
                    initialValue: formRecord.a,
                  })(<Input />)}
                </Form.Item>
              </Col>

              <Col md={6} sm={24}>
                <Form.Item label={formatMessage({ id: '加数' })}>
                  {form.getFieldDecorator('b', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: '请输入' }) + formatMessage({ id: '加数' }),
                      },
                    ],
                    initialValue: formRecord.b,
                  })(<Input />)}
                </Form.Item>
              </Col>

              <Col md={6} sm={24}>
                <Button
                  type="primary"
                  onClick={() => {
                    form.validateFieldsAndScroll((error, record) => {
                      if (!error) {
                        console.log(record);
                        this.setState({
                          formRecord: record,
                          result: parseInt(record.a, 10) + parseInt(record.b, 10),
                        });
                      }
                    });
                  }}
                >
                  {formatMessage({ id: '求和' })}
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  onClick={() => {
                    form.resetFields();
                    this.setState({ formRecord: { a: 0, b: 0 }, result: 0 });
                  }}
                >
                  {formatMessage({ id: '重置' })}
                </Button>
              </Col>
            </Row>
          </Form>

          <Divider />

          <h1>
            {formRecord.a} + {formRecord.b} = {result}
          </h1>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Index);
