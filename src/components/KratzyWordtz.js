import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';

const KratzyWordtz = () => {
  return (
    <div className="landing-grid" style={{ width: '100%', margin: 'auto' }}>
      Kratzy Wordtz
      <div>
        <Button />
      </div>
    </div>


    // <div style={{ width: '100%', margin: 'auto' }}>
    //   <Grid className="landing-grid">
    //     <Cell col={12}>
    //       Kratzy Wordtz
    //   <div>
    //         <Button />
    //       </div>
    //     </Cell>
    //   </Grid>
    // </div>
  );
}

export default KratzyWordtz;