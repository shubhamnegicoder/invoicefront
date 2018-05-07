import React from 'react';

const MobileTearSheet = React.Component({


  getDefaultProps() {
    return {
      height: 500,
    };
  },

  render() {
    const styles = {
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360,
      },
      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360,
      },
    };

    return (
      <div style={this.prepareStyles(styles.root)}>
        <div style={this.prepareStyles(styles.container)}>
          {this.props.children}
        </div>
        <img style={this.prepareStyles(styles.bottomTear)} src="images/bottom-tear.svg" />
      </div>
    );
  },

});

export default MobileTearSheet;