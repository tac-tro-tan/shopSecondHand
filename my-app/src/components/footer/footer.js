import React from "react";
import {
	Box,
	Container,
	Row,
	Column,
	Heading,
} from "./FooterStyle";

const Footer = () => {
	return (
		<Box>
			<Container>
				<Row>
					<Column>
						<Heading>Điều khoản sử dụng</Heading>
					</Column>
					<Column>
						<Heading>Quy định bảo mật</Heading>
					</Column>
					<Column>
						<Heading>Tổng đài hỗ trợ </Heading>
						{/* <FooterLink href="#"></FooterLink> */}
					</Column>
					<Column>
						<Heading>Giới thiệu</Heading>
					</Column>
				</Row>
				<Heading>
					<p>
						© 2018 | Bản quyền thuộc Bộ Kế hoạch và Đầu tư
						<span className="px-5">
							Email : hotro@dangkykinhdoanh.gov.vn
						</span>
						<span className="px-5">
						Địa chỉ : 6B Hoàng Diệu, Quận Ba Đình, Hà Nội, Việt Nam
						</span>
					</p>
				</Heading>
			</Container>
		</Box>
	);
};
export default Footer;
