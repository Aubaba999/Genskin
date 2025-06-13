import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <h1>วันละะห์หน้า ใส่ใจผิว</h1>
      <p>ติดตามการรักษาโรคผิวหนังบนใบหน้าด้วยโมเดล 3D และภาพถ่ายอย่างแม่นยำ</p>
      
      <section className="continuous-service">
        <h2>ส่งต่อเนื่องาน</h2>
      </section>
      
      <section className="genskin-features">
        <h2>GENSKIN</h2>
        <table>
          <thead>
            <tr>
              <th>HEADER1</th>
              <th>HEADER1</th>
              <th>HEADER1</th>
              <th>HEADER1</th>
              <th>HEADER1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SUB+HEADER</td>
              <td>SUB+HEADER</td>
              <td>SUB+HEADER</td>
              <td>SUB+HEADER</td>
              <td>SUB+HEADER</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default HomePage;