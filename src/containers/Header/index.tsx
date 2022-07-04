import classNames from 'classnames';
//import { TOGGLE_SIDEBAR } from 'modules/public/globalSettings/constants';
import * as React from 'react';
import { FaAward, FaGift, FaHistory, FaSignOutAlt, FaStar, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutFetch, selectUserLoggedIn } from '../../modules';



const Logo = require('../../assets/images/logo.svg');

//var SidebarContainer = React.lazy(() => import('../../containers/Sidebar').then(({ Sidebar }) => ({ default: Sidebar })));
const SBToggler = React.lazy(() => import('../SideBarToggle').then(({ SideBarToggle }) => ({ default: SideBarToggle })));


export const Header: React.FC = () => {
	const history = useHistory();
	const intl = useIntl();

	const isLoggedIn = useSelector(selectUserLoggedIn);
	const [activeNow, setActiveNow] = React.useState('');
	const [activeItemDrop, setActiveItemDrop] = React.useState('');

	const dispatch = useDispatch();

	const setStateActiveNow = (nameActive: string) => {
		setActiveNow(nameActive);
		setActiveItemDrop('');
	};

	const classActiveItemDrop = (nameItem: string) =>
		classNames('header__right-menu__dropdown__wrap__content__title d-flex align-items-center', {
			'header__right-menu__dropdown__wrap__content__title--active': activeItemDrop === nameItem,
		});

	const classLinkActive = (nameActive: string) => {
		return classNames('header__left-menu__dropdown__wrap', {
			'header__left-menu__dropdown__wrap--active': activeNow === nameActive,
		});
	};

	const classLinkActiveTitleDrop = (nameActive: string) => {
		return classNames('header__right-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center', {
			'header__right-menu__dropdown__wrap__dropbtn--active': activeNow === nameActive,
		});
	};
	
	const renderSidebarToggle = () => {
	
		return (
				<SBToggler />
			)
		
	};
	if (isLoggedIn) renderSidebarToggle();

	const renderWalletLink = () => {
		const classItemTitle = classNames('header__right-menu__item__title', {
			'header__right-menu__item__title--active': activeNow === 'Wallet',
		});

		return (
			isLoggedIn && (
				<div className="header__right-menu__item ">
					<div className={classItemTitle} onClick={() => setStateActiveNow('Wallet')}>
						<Link to="/wallets">My Wallets</Link>
					</div>
				</div>
			)
		);
	};

	const renderOrderTab = () => {
		return (
			isLoggedIn && (
				<div className="header__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('orders')}>
						{translate('page.body.homepage.header.orders')}
						<div className="header__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="header__right-menu__dropdown__wrap__content">
						<Link
							to="/orders"
							onClick={() => {
								setStateActiveNow('orders');
								setActiveItemDrop('orders');
							}}
						>
							<div className={classActiveItemDrop('orders')}>
								<FaStar className="mr-2" />
								{translate('page.body.homepage.header.openOrder')}
							</div>
						</Link>
						<Link
							to="/history"
							onClick={() => {
								setStateActiveNow('orders');
								setActiveItemDrop('history');
							}}
						>
							<div className={classActiveItemDrop('history')}>
								<FaHistory className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.history')}
							</div>
						</Link>
					</div>
				</div>
			)
		);
	};

	const renderLogout = () => {
		if (!isLoggedIn) {
			return null;
		}

		return (
			<Link
				to=" "
				onClick={() => {
					dispatch(logoutFetch());
					setStateActiveNow('');
					setActiveItemDrop('');
				}}
			>
				<div className="header__right-menu__dropdown__wrap__content__title d-flex align-items-center">
					<FaSignOutAlt className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
					<FormattedMessage id={'page.body.profile.content.action.logout'} />
				</div>
			</Link>
		);
	};

	const renderProfileLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/profile"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('profile');
					}}
				>
					<div className={classActiveItemDrop('profile')}>
						<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
						<FormattedMessage id={'page.header.navbar.profile'} />
					</div>
				</Link>
			)
		);
	};

	const renderProfileTab = () => {
		return (
			isLoggedIn && (
				<>
					<div className="header__right-menu__dropdown__wrap">
						<span className={classLinkActiveTitleDrop('account')}>
							{translate('page.body.homepage.header.account')}
							<div className="header__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
						</span>
						<div className="header__right-menu__dropdown__wrap__content header__right-menu__dropdown__wrap__content--account">
							{renderProfileLink()}
							{renderReferralLink()}
							{renderLogout()}
						</div>
					</div>
				</>
			)
		);
	};

	const renderReferralLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/referral"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('referral');
					}}
				>
					<div className={classActiveItemDrop('referral')}>
						<FaUserPlus className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
						<FormattedMessage id={'page.header.navbar.referral'} />
					</div>
				</Link>
			)
		);
	};

	


	const redirectSingIn = () => {
		history.push('/login');
	};

	const redirectSingUp = () => {
		history.push('/signup');
	};

	const translate = (key: string) => intl.formatMessage({ id: key });

	const renderUnLogin = () => {
		const classLinkActiveLogin = classNames('header__right-menu__item__title', {
			'header__right-menu__item__title--active': activeNow === 'login',
		});

		const classLinkActiveRegister = classNames('header__right-menu__item__title header__right-menu__item__title--btn ', {
			'header__right-menu__item__title--btn--active': activeNow === 'register',
		});

		return (
			!isLoggedIn && (
				<>
					<div
						className="header__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingIn();
							setStateActiveNow('login');
						}}
					>
						<div className={classLinkActiveLogin}>
							<span>{translate('page.body.homegape.header.button2')}</span>
						</div>
					</div>
					<div
						className="header__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingUp();
							setStateActiveNow('register');
						}}
					>
						<span className={classLinkActiveRegister}>{translate('page.body.homegape.header.button3')}</span>
					</div>
				</>
			)
		);
	};
	
	return (

		<div className="headerDesktop-screen">

			<div className="container-header">
				<nav className="header d-flex flex-row justify-content-between align-items-center">
					<div className="header__left-menu d-flex flex-row align-items-center">
						<div className="header__left-menu__logo" onClick={() => setStateActiveNow('')}>
							<Link to="/">
								<img src={Logo} alt="" />
							</Link>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0">
							<div className={classLinkActive('markets')} onClick={() => setStateActiveNow('markets')}>
								<Link
									to="/markets"
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									Markets
								</Link>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0 ">
							<div className={classLinkActive('ieo')} onClick={() => setStateActiveNow('ieo')}>
								<Link
									to="/ieo"
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									New Listings
								</Link>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0 d-none d-lg-block d-xl-block ">
							<div className={classLinkActive('stake')} onClick={() => setStateActiveNow('stake')}>
								<Link
									to="/fortem-token"
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									 Fortem Token
								</Link>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap">
								<span className={classLinkActiveTitleDrop('More')}>
									More
									<div className="header__left-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
								</span>
								<div className="header__left-menu__dropdown__wrap__content">
									<Link
										to=""
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('for-issuers');
										}}
									>
										<div className={classActiveItemDrop('for-issuers')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											For issuers
										</div>
									</Link>
									<Link
										to=""
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('for-investors');
										}}
									>
										<div className={classActiveItemDrop('for-investors')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											For investors
										</div>
									</Link>
									<Link
										to="/airdrops"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('airdrops');
										}}
									>
										<div className={classActiveItemDrop('airdrops')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Airdrops
										</div>
									</Link>
									<Link
										to="/trading-competition"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('trading-competition');
										}}
									>
										<div className={classActiveItemDrop('trading-competition')}>
											<FaAward className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Competitions
										</div>
									</Link>
									<Link
										to="/quant-zone"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('quant-zone');
										}}
									>
										<div className={classActiveItemDrop('quant-zone')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Quant Zone
										</div>
									</Link>
									<Link
										to="/advanced-trading"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('advanced-trading');
										}}
									>
										<div className={classActiveItemDrop('advanced-trading')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Advanced
										</div>
									</Link>										
								</div>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap">
								<span className={classLinkActiveTitleDrop('Learn')}>
									Learn
									<div className="header__left-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
								</span>
								<div className="header__left-menu__dropdown__wrap__content">
									<Link
										to=""
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('Learn');
											setActiveItemDrop('Research');
										}}
									>
										<div className={classActiveItemDrop('research')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Research
										</div>
									</Link>
									<Link
										to="/"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('Learn');
											setActiveItemDrop('Academy');
										}}
									>
										<div className={classActiveItemDrop('academy')}>
											<FaAward className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Academy
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className={classLinkActive('news')} onClick={() => setStateActiveNow('news')}>
								<Link
									to=""
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									News
								</Link>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className={classLinkActive('help')} onClick={() => setStateActiveNow('help')}>
								<Link
									to=""
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									Help
								</Link>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className={classLinkActive('about')} onClick={() => setStateActiveNow('about')}>
								<Link
									to=""
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									About Fortem
								</Link>
							</div>
						</div>
						
					</div>

					<div className="header__right-menu d-flex align-items-center flex-row">
					
						{renderUnLogin()}
						{renderWalletLink()}
						{renderOrderTab()}
						{renderProfileTab()}

					</div>
				</nav>
			</div>
		</div>
	);
};
