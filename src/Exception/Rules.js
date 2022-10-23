import React from 'react'
import "./Rules.css";
import Header from '../Components/Home/Header';
import BottomTab from './BottomTab';
import MetaData from './MetaData';
import Footer from '../Components/Footer/Footer';

const Rules = () =>
{
	return (
		<>
			<MetaData title="Rules" />
			<Header />
			<div className='rules' style={{
				padding: "50px 30px",
				display: "flex",
				width: "95%",
				overflow: "hidden"
			}}>
				<ul className='rules'>
					<span style={{
						color: "#000",
						fontSize: "1.3rem",
						fontWeight: "800",
						fontFamily: "Roboto",
					}}>Some Rules:</span>
					<li>1. Bạn có thể dễ dàng trả lại sản phẩm của mình..Nhưng bạn phải cung cấp cho chúng tôi phí giao hàng ...</li>
					<li>2. Bạn phải tính phí giao hàng trước khi tính tiền mặt khi Giao hàng..Tại các thành phố lớn bạn phải đưa 70vnd và phí bên ngoài sẽ là hoàn toàn miễn phí</li>
					<li>3. Bạn không thể mua các sản phẩm hết hàng ...</li>
					<li>4. Bạn có thể mua bất kỳ sản phẩm nào từ chúng tôi ...chúng tôi đang cố gắng hết sức để đưa ra chất lượng sản phẩm tốt nhất ....</li>
					<li>5. Bạn có thể tìm thấy thêm các tính năng mới trong hệ thống của chúng tôi trong thời gian rất sớm ...Các nhà phát triển của chúng tôi luôn làm việc vì các dịch vụ tốt của bạn ...</li>
					<li>6. Cuối cùng, cảm ơn đã ghé thăm trang web của chúng tôi ... Chúc một ngày tốt lành!</li>
				</ul>
			</div>
			<Footer />
			<BottomTab />
		</>
	)
}

export default Rules
