import { NewModal } from '../../components';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectWallets } from 'modules';
import NP from 'number-precision';
NP.enableBoundaryChecking(false);

interface ModalWithdrawConfirmProps {
	amount: string;
	currency: string;
	onSubmit: () => void;
	onDismiss: () => void;
	rid: string;
	isMobileDevice?: boolean;
	show: boolean;
	ethBallance?: string;
	selectedWalletFee?: number;
	ethFee?: number;
}

export const ModalWithdrawConfirm = (props: ModalWithdrawConfirmProps) => {
	const wallets = useSelector(selectWallets);
	const { balance } = wallets.find(wallet => wallet.currency === 'eth') || { balance: undefined };
	const { onDismiss, show, onSubmit, amount, currency, rid, selectedWalletFee, ethFee } = props;
	const intl = useIntl();
	const formattedCurrency = currency.toUpperCase();
	const newETHBalance = balance && ethFee ? NP.minus(Number(balance), Number(ethFee)) : undefined;
	return (
		<NewModal show={show} onClose={onDismiss} title="Confirmation">
			<div className="td-modal-mobile-withdraw-confirm">
				<p>
					{intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.message1' })}
					{amount} <strong>{formattedCurrency}</strong>
					{intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.message2' })}
				</p>
				<p>
					<code>{rid}</code>
				</p>
				<p hidden={Number(selectedWalletFee) === 0}>
					Your <strong>ETH</strong> will remain <br />${balance ?? 'Unavailable'} - ${ethFee ?? 'Unavailable'} = $
					{newETHBalance?.toFixed(5) ?? 'Unavailable'} ETH
				</p>

				<div className="d-flex justify-content-center mt-3 td-modal-mobile-withdraw-confirm__buttons">
					<button className="td-modal-mobile-withdraw-confirm__buttons__close-btn" onClick={onDismiss}>
						Close
					</button>
					<button className="td-modal-mobile-withdraw-confirm__buttons__withdraw-btn" onClick={onSubmit}>
						Withdraw
					</button>
				</div>
			</div>
		</NewModal>
	);
};
