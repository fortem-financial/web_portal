import { Col, Row } from 'antd/lib/grid';
import * as React from 'react';
import { CardInfo, ClaimHistory, DetailInfo, TaskTabs } from '../../../containers';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { AirdropDetailConfig } from '..';
import { selectAirdrop } from '../../../../../modules';

interface HNYDetailProps {
	detailConfig: AirdropDetailConfig;
}
const guideContent = (
	<p>
		{' '}
		<strong style={{ textDecoration: 'underline' }}>Task Step</strong> <br />
		<br />
		1. Have an account/register on{' '}
		<a href="https://www.cx.finance/signup" style={{ color: '#1155cc !important' }} target="_blank" rel="noopener noreferrer">
			Fortem
		</a>
		<br />
		2. Come{' '}
		<a
			href="https://www.cx.finance/airdrop"
			style={{ color: '#1155cc !important' }}
			target="_blank"
			rel="noopener noreferrer"
		>
			Fortem Airdrop Hub
		</a>{' '}
		and Join Safari Token Airdrop
		<br />
		3. Join{' '}
		<a href="https://t.me/ElasticToken" style={{ color: '#1155cc !important' }} target="_blank" rel="noopener noreferrer">
			Elastic Group{' '}
		</a>{' '}
		on Telegram <br />
		4. Follow{' '}
		<a
			href="https://twitter.com/CoinElastic"
			style={{ color: '#1155cc !important' }}
			target="_blank"
			rel="noopener noreferrer"
		>
			Elastic Project{' '}
		</a>{' '}
		on Twitter <br />
		5. Like{' '}
		<a
			href="https://www.facebook.com/Fortem/posts/183687496786583"
			style={{ color: '#1155cc !important' }}
			target="_blank"
			rel="noopener noreferrer"
		>
			Elastic Event Post{' '}
		</a>{' '}
		on Facebook <br />
		6. Get your rewards. <br />
		<br />
		<strong style={{ textDecoration: 'underline' }}>Condition:</strong> <br />
		<br />
		1. Have Fortem account before 1st January 2021. <br />
		2. Have min deposit 0.05ETH and Trade 1 time in Fortem Exchange
		<br />
		<br />
		<strong style={{ textDecoration: 'underline' }}>Note:</strong> <br />
		<br />
		1. Please use your current Fortem account. The reward will be credited to this account. <br />
		2. You need Generate Elastic Wallet in <a href="/wallets">Wallets Page</a> <br />
		3. This Event is not apply for Bangladesh user
	</p>
);

const importantContent = (
	<p>
		<strong style={{ textDecoration: 'underline' }}>Fortem Airdrop Information:</strong> <br />
		<br />
		1. Total Reward: 500 ESC <br />
		2. Start in: 3rd January 2021 <br />
		3. End in: 8th January 2021 <br />
		4. Distribute in: 15th January 2021 <br />
		5. Task List: Telegram, Twitter, Facebook <br />
		<br />
		Participants must remain subscribed to social media channels until the end of the airdrop to be eligible for social task
		rewards.
		<br />
		<br />A total reward of <strong> 2 ESC</strong> will be given to eligible participants.
		<br />
		<br />
		<strong style={{ textDecoration: 'underline' }}>Note:</strong> Fortem Team will lock all account cheat Airdrop, if our
		system detect it. <strong>PLEASE DONT CHEAT US !!!</strong>
	</p>
);

export const HNYDetail: React.FC<HNYDetailProps> = (props: HNYDetailProps) => {
	const airdrop = useSelector(selectAirdrop);

	let pageView: JSX.Element;
	if (!airdrop.loading && airdrop.payload.length > 0) {
		const dates = [airdrop.payload[0].start_date, airdrop.payload[0].end_date, airdrop.payload[0].deliver_date];
		let dateIndex: number;
		// tslint:disable-next-line: prefer-conditional-expression
		if (new Date() < new Date(dates[0])) {
			dateIndex = 0; // not start
		} else if (new Date() < new Date(dates[1])) {
			dateIndex = 1; // started
		} else if (new Date() < new Date(dates[2])) {
			dateIndex = 2; // ended
		} else {
			dateIndex = 3; // devivering
		}

		pageView = (
			<Row gutter={[8, 8]}>
				<Col span={6}>
					<CardInfo cardTitle="Guide">{guideContent}</CardInfo>
				</Col>
				<Col span={12}>
					<CardInfo cardTitle="">
						<DetailInfo
							airdropName={airdrop.payload[0].airdrop_name}
							airdropBonus={`${airdrop.payload[0].tokens_per_claim} ${airdrop.payload[0].token_name}`}
							status={dateIndex}
							date={dateIndex === -1 || dateIndex === 3 ? '' : dates[dateIndex]}
						/>
					</CardInfo>
				</Col>
				<Col span={6}>
					<CardInfo cardTitle="Important">{importantContent}</CardInfo>
				</Col>

				{dateIndex > 0 ? (
					<Col span={12}>
						<CardInfo cardTitle="Tasks">
							<TaskTabs airdropID={props.detailConfig.id} tasksConfig={props.detailConfig.tasks} />
						</CardInfo>
					</Col>
				) : (
					''
				)}
				<Col span={dateIndex !== 1 ? 24 : 12}>
					<CardInfo cardTitle="Claim History">
						<ClaimHistory airdropID={props.detailConfig.id} />
					</CardInfo>
				</Col>
			</Row>
		);
	} else {
		pageView = (
			<div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
				<Spin size="large" />
			</div>
		);
	}

	return <React.Fragment>{pageView}</React.Fragment>;
};
