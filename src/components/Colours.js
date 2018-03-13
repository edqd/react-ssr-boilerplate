import styled from 'styled-components';
import * as React from 'react';

const Coloured = styled.div`
    background: #${props => props.colour};
`;

const Colours = ({ match: { params: { colour }}}) => {
    return <Coloured colour={colour}>test</Coloured>;
}

export default Colours;