import React from 'react';

import {shallow, render} from 'enzyme';
import {expect} from 'chai';

import Sparkline from '../Sparkline';

// Shallow Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
describe('Shallow Rendering', () => {

    it('to have canvas tag', () => {
        const wrapper = shallow(
          <Sparkline
            className={'canvas_wrapper'}
            dataPoints={[1,2,3,4,5]}
            width={100}
            height={100}
            initialColor={'#ff0000'}
            endColor={'#ff0000'} />
        );
        expect(wrapper.find('canvas')).to.have.length(1);
    });

});

// Static Rendered Markup
// https://github.com/airbnb/enzyme/blob/master/docs/api/render.md
describe('Static Rendered Markup', () => {

    it('renders one canvas tag', () => {
        const wrapper = render(
          <Sparkline
            className={'canvas_wrapper'}
            dataPoints={[1,2,3,4,5]}
            width={100}
            height={100}
            initialColor={'#ff0000'}
            endColor={'#ff0000'} />
        );
        expect(wrapper.find('canvas')).to.have.length(1);
    });

});
