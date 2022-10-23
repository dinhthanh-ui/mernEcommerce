import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import Header from "../Home/Header";
import Loading from "../../Exception/Loading";
import MetaData from "../../Exception/MetaData";
import "./About.css";
import BottomTab from "../../Exception/BottomTab";

const About = () =>
{
	const { loading } = useSelector(
		(state) => state.profile
	);
	return (
		<>
			{loading ? <Loading /> :
				<>
					<MetaData title="About" />
					<div>
						<Header />
						<div
							style={{
								width: "90%",
								margin: "0px auto",
							}}
						>
							<div className="about__page">
								{/* 1st verse */}
								<div className="row flex">
									<div className="col__2">
										<img src="http://360connect.edu.vn/wp-content/uploads/2021/08/Da%CC%82%CC%80u-be%CC%82%CC%81p.png" alt="" />
									</div>
									<div className="col__2">
										<div className="meta">
											<span
												style={{
													fontSize: "40px",
													fontWeight: "700",
													lineHeight: "1.2",
												}}
											>
												Welcome to Nest
											</span>
											<p>
												Đi học nghề làm bếp cho bạn cơ hội tiếp cận với nền ẩm thực quốc tế nơi bạn theo học, chẳng hạn muốn học làm sushi thì đến Nhật là lựa chọn đúng đắn. Việc tiếp xúc với nền ẩm thực của các quốc gia trên thế giới cùng môi trường làm việc thực tế sẽ giúp bạn có góc nhìn đa dạng hơn về nghề.
											</p>
											<p>
												Tùy thuộc sở thích, đam mê và mục tiêu phát triển sự nghiệp, sinh viên có thể chọn du học ngành nấu ăn (bếp nóng) hoặc ngành làm bánh (bếp lạnh). Trong quá trình đào tạo, bạn sẽ được học:
												Cách chọn lựa, sơ chế, bảo quản thực phẩm.
												Phát triển thực đơn phù hợp với phong cách nhà hàng và đối tượng khách hàng.
												Nếu theo học bếp nóng, sinh viên sẽ được học cách làm các món khai vị, món chính, các loại nước sốt, món súp với nguyên liệu từ cơ bản đến cao cấp.
												Nếu theo học làm bánh, bạn sẽ biết cách làm các loại bánh ngọt, bánh mì, món tráng miệng cùng tạo hình với đường và chocolate.
												Cách trình bày, trang trí món ăn đẹp mắt và hấp dẫn.
												Kỹ năng giao tiếp, làm việc hiệu quả với cộng sự, giữ gìn vệ sinh an toàn thực phẩm.
												Kỹ năng vận hành và quản lý chuyên nghiệp trong các mảng nhân sự, hoạt động nhà bếp, ngân sách.
											</p>
										</div>
									</div>
								</div>

								{/* 2nd verse */}
								<div className="second">
									<div className="heading">
										<h2>What We Provide?</h2>
									</div>
									<div className="row flex">
										<div className="col__3">
											<div style={{
												padding: "10px",
												border: "1px solid rgb(0 0 0 / 14%)",
												minHeight: "230px"
											}}>
												<div className="flex align__items__center justify__content__center image">
													<img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg" alt="" />
												</div>
												<span>Best Prices & Offers</span>
												<p>
													There are many variations of passages of Lorem Ipsum
													available, but the majority have suffered alteration in some
													form
												</p>
											</div>
										</div>
										<div className="col__3">
											<div style={{
												padding: "10px",
												border: "1px solid rgb(0 0 0 / 14%)",
												minHeight: "230px"
											}}>
												<div className="flex align__items__center justify__content__center image">
													<img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-2.svg" alt="" />
												</div>
												<span>Best For Trust & Quality</span>
												<p>
													There are many variations of passages of Lorem Ipsum
													available, but the majority have suffered alteration in some
													form
												</p>
											</div>
										</div>
										<div className="col__3">
											<div style={{
												padding: "15px",
												border: "1px solid rgb(0 0 0 / 14%)",
												minHeight: "230px"
											}}>
												<div className="flex align__items__center justify__content__center image">
													<img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-3.svg" alt="" />
												</div>
												<span>Fast Delivery System</span>
												<p>
													There are many variations of passages of Lorem Ipsum
													available, but the majority have suffered alteration in some
													form
												</p>
											</div>
										</div>


										<div className="col__3">
											<div style={{
												padding: "15px",
												border: "1px solid rgb(0 0 0 / 14%)",
												minHeight: "230px"
											}}>
												<div className="flex align__items__center justify__content__center image">
													<img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-4.svg" alt="" />
												</div>
												<span>Easy Returns Service</span>
												<p>
													There are many variations of passages of Lorem Ipsum
													available, but the majority have suffered alteration in some
													form
												</p>
											</div>
										</div>

										<div className="col__3">
											<div style={{
												padding: "15px",
												border: "1px solid rgb(0 0 0 / 14%)",
												minHeight: "230px"
											}}>
												<div className="flex align__items__center justify__content__center image">
													<img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-5.svg" alt="" />
												</div>
												<span>100% satisfication</span>
												<p>
													There are many variations of passages of Lorem Ipsum
													available, but the majority have suffered alteration in some
													form
												</p>
											</div>
										</div>

										<div className="col__3">
											<div style={{
												padding: "15px",
												border: "1px solid rgb(0 0 0 / 14%)",
												minHeight: "230px"
											}}>
												<div className="flex align__items__center justify__content__center image">
													<img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-6.svg" alt="" />
												</div>
												<span>Great Daily Deal</span>
												<p>
													There are many variations of passages of Lorem Ipsum
													available, but the majority have suffered alteration in some
													form
												</p>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<Footer />
					</div>
					<BottomTab />
				</>
			}
		</>
	);
};

export default About;
