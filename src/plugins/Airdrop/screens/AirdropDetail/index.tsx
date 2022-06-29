import { Button, Result } from 'antd';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { injectIntl } from 'react-intl';
import { connect, useSelector } from 'react-redux';
import { claimFetchUserId, ClaimState, RootState, selectClaim, selectUserInfo } from '../../../../modules';
import { airdropFetchId, AirdropState, selectAirdrop } from '../../../../modules/airdrops/airdrop';
import * as actions from '../../../../modules/index';

import { HNYDetail } from './HNYDetail';
import { IDDetail } from './IDDetail';
import { LKTDetail } from './LKTDetail';
import { VNDetail } from './VNDetail';

export interface FacebookTabConfig {
	facebookAppId: string;
	facebookPage: string;
	facebookPost: string;
	disable: boolean;
}

export interface TwitterTabConfig {
	twitterName: string;
	twitterUserName: string;
	twitterPage: string;
	twitterPost: string;
	twitterPostId: string;
	disable: boolean;
}

export interface TelegramTabConfig {
	telegramGroup: string;
	telegramChannel: string;
	disable: boolean;
}

export interface TasksConfig {
	twitter: TwitterTabConfig;
	facebook: FacebookTabConfig;
	telegram: TelegramTabConfig;
}

export interface AirdropDetailConfig {
	id: string;
	tasks: TasksConfig;
}

interface ReduxProps {
	airdrops: AirdropState;
	claims: ClaimState;
}
interface DispatchProps {
	onFetchAirdrop: typeof airdropFetchId;
	onFetchClaimOfUser: typeof claimFetchUserId;
}

type Props = ReduxProps & DispatchProps & AirdropDetailConfig;

const detailData: AirdropDetailConfig[] = [
	{
		id: '10',
		tasks: {
			telegram: {
				telegramGroup: '',
				telegramChannel: '',
				disable: false,
			},
			twitter: {
				twitterName: 'Fortem Exchange',
				twitterUserName: 'Fortem',
				twitterPage: 'https://twitter.com/Fortem',
				twitterPost: 'https://twitter.com/Fortem/status/',
				twitterPostId: '',
				disable: false,
			},
			facebook: {
				facebookAppId: '',
				facebookPage: 'http://www.facebook.com/Fortem',
				facebookPost: 'https://www.facebook.com/Fortem/posts/',
				disable: false,
			},
		},
	},
	{
		id: '2',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/',
				telegramChannel: 'https://t.me/Fortem_news',
				disable: false,
			},
			twitter: {
				twitterName: 'Fortem Exchange',
				twitterUserName: 'Fortem',
				twitterPage: 'https://twitter.com/Fortem',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'http://www.facebook.com/Fortem',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},
	{
		id: '3',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/Fortem"',
				telegramChannel: 'https://t.me/Fortem_News',
				disable: false,
			},
			twitter: {
				twitterName: 'Fortem Exchange',
				twitterUserName: 'Fortem',
				twitterPage: 'https://twitter.com/Fortem',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'http://www.facebook.com/Fortem',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},
	{
		id: '4',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/FortemToken',
				telegramChannel: 'https://t.me/Fortem_News',
				disable: false,
			},
			twitter: {
				twitterName: 'Elastic',
				twitterUserName: 'Elastic',
				twitterPage: 'https://twitter.com/CoinElastic',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'https://www.facebook.com/elasticcoin.org/',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},
	{
		id: '6',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/shabushabufinance',
				telegramChannel: 'https://t.me/Fortem_News',
				disable: false,
			},
			twitter: {
				twitterName: 'shabufinance',
				twitterUserName: 'shabufinance',
				twitterPage: 'https://twitter.com/shabufinance',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'https://www.facebook.com/Fortem',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},
	{
		id: '7',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/OrientProjectFinance',
				telegramChannel: 'https://t.me/Fortem_News',
				disable: false,
			},
			twitter: {
				twitterName: 'OrientProject',
				twitterUserName: 'OrientProject',
				twitterPage: 'https://twitter.com/OrientProject',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'https://www.facebook.com/orientproject.finance',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},

	{
		id: '8',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/ElasticToken',
				telegramChannel: 'https://t.me/Fortem_News',
				disable: false,
			},
			twitter: {
				twitterName: 'Elastic',
				twitterUserName: 'CoinElastic',
				twitterPage: 'https://twitter.com/CoinElastic',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'https://www.facebook.com/Fortem',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},

	{
		id: '9',
		tasks: {
			telegram: {
				telegramGroup: 'https://t.me/Fortem_office',
				telegramChannel: 'https://t.me/Fortem_News',
				disable: false,
			},
			twitter: {
				twitterName: 'Fortem',
				twitterUserName: 'Fortem',
				twitterPage: 'https://twitter.com/Fortem',
				twitterPost: 'https://twitter.com/Fortem/status/1234567890',
				twitterPostId: '1234567890',
				disable: false,
			},
			facebook: {
				facebookAppId: '1234567890',
				facebookPage: 'https://www.facebook.com/Fortem',
				facebookPost: 'https://www.facebook.com/Fortem/posts/1234567890',
				disable: false,
			},
		},
	},
];

const Detail: React.FC<Props> = (props: Props) => {
	const { airdropID } = useParams<{ airdropID: string }>();
	const user = useSelector(selectUserInfo);
	const { onFetchAirdrop, onFetchClaimOfUser } = props;
	React.useEffect(() => {
		onFetchAirdrop({
			id: airdropID,
		});
		onFetchClaimOfUser({
			airdrop_id: airdropID,
			user_uid: user.uid,
		});
	}, [airdropID, user.uid, onFetchAirdrop, onFetchClaimOfUser]);

	const detail = detailData.find(detailParam => detailParam.id === airdropID);
	let detailScreen: JSX.Element;
	if (detail !== undefined) {
		switch (airdropID) {
			case '10':
				detailScreen = <IDDetail detailConfig={detail} />;
				break;
			case '2':
				detailScreen = <LKTDetail detailConfig={detail} />;
				break;
			case '3':
				detailScreen = <LKTDetail detailConfig={detail} />;
				break;
			case '4':
				detailScreen = <LKTDetail detailConfig={detail} />;
				break;
			case '5':
				detailScreen = <LKTDetail detailConfig={detail} />;
				break;
			case '6':
				detailScreen = <LKTDetail detailConfig={detail} />;
				break;
			case '7':
				detailScreen = <LKTDetail detailConfig={detail} />;
				break;
			case '8':
				detailScreen = <HNYDetail detailConfig={detail} />;
				break;
			case '9':
				detailScreen = <VNDetail detailConfig={detail} />;
				break;
			default:
				detailScreen = (
					<Result
						status="error"
						title="Page not exists!"
						extra={[
							<Button type="primary" href="/airdrop" key="console">
								Go back Airdrop List
							</Button>,
						]}
					/>
				);
				break;
		}
	} else {
		detailScreen = (
			<Result
				status="error"
				title="Page not exists!"
				extra={[
					<Button type="primary" href="/airdrop" key="console">
						Go back Airdrop List
					</Button>,
				]}
			/>
		);
	}

	return <div className="container-fluid pl-3 pr-3">{detailScreen}</div>;
};

const mapStateToProps = (state: RootState): ReduxProps => ({
	airdrops: selectAirdrop(state),
	claims: selectClaim(state),
});

const mapDispatchToProps = dispatch => {
	return {
		onFetchAirdrop: payload => dispatch(actions.airdropFetchId(payload)),
		onFetchClaimOfUser: payload => dispatch(actions.claimFetchUserId(payload)),
	};
};

export const AirdropDetail = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Detail as any)) as any;
