import styled from 'styled-components';

export const Box = styled.div`
background: black;
position: absolute;
width: 100%;

@media (max-width: 1000px) {
	padding: 10px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin: 0 auto;
`;

export const Row = styled.div`
display: flex;
justify-content: space-evenly;
@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

// export const FooterLink = styled.a`
// color: #fff;
// margin-bottom: 20px;
// font-size: 18px;
// text-decoration: none;

// &:hover {
// 	color: green;
// 	transition: 200ms ease-in;
// }
// `;

export const Heading = styled.p`
font-size: 16px;
color: #fff;
margin-bottom: 10px;
font-weight: bold;
`;
