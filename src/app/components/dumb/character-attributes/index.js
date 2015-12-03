import styles from './character-attributes.less';
import iconStyles from '../../../styles/icons/icons.less';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			attributes: '=',
			profession: '@',
			showTooltip: '&'
		},
		controller: CharacterAttributes,
		controllerAs: 'ctrl',
		template: `
			<div 
				ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Attack Power' })"
				ng-mouseleave="ctrl.showTooltip({ show: false })"
				class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.attackPower}"></i>
					<span>{{ ctrl.attributes.power }}</span>
				</div>

				<div
					ng-mouseenter="ctrl.showTooltip({ show: true, type: ctrl.getProfessionAttributeName(ctrl.profession) })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i
						ng-class="ctrl.getProfessionCssClass(ctrl.profession)" 
						class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon}"></i>
					<span>{{ ctrl.attributes.profession }}%</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Toughness' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.toughness}"></i>
					<span>{{ ctrl.attributes.toughness }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Armor' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.armor}"></i>
					<span>{{ ctrl.attributes.armor }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Vitality' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.vitality}"></i>
					<span>{{ ctrl.attributes.vitality }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Health' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute} ${styles.attributeHealth}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.health}"></i>
					<span>{{ ctrl.attributes.health }}</span>
				</div>
				
				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Precision' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.precision}"></i>
					<span>{{ ctrl.attributes.precision }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Critical Chance' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.criticalChance}"></i>
					<span>{{ ctrl.attributes.criticalChance }}%</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Ferocity' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.ferocity}"></i>
					<span>{{ ctrl.attributes.ferocity }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Critical Damage' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.criticalDamage}"></i>
					<span>{{ ctrl.attributes.criticalDamage }}%</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Condition Damage' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.conditionDamage}"></i>
					<span>{{ ctrl.attributes.conditionDamage }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Condition Duration' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.conditionDuration}"></i>
					<span>{{ ctrl.attributes.conditionDuration }}%</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Concentration' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.boon}"></i>
					<span>{{ ctrl.attributes.concentration }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Healing Power' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.healing}"></i>
					<span>{{ ctrl.attributes.healing }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Expertise' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.conditionDuration}"></i>
					<span>{{ ctrl.attributes.expertise }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Boon Duration' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.boon}"></i>
					<span>{{ ctrl.attributes.boon }}%</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Agony Resistance' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.agony}"></i>
					<span>{{ ctrl.attributes.agony }}</span>
				</div>

				<div 
					ng-mouseenter="ctrl.showTooltip({ show: true, type: 'Magic Find' })"
					ng-mouseleave="ctrl.showTooltip({ show: false })"
					class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.magicFind}"></i>
					<span>{{ ctrl.attributes.magic }}%</span>
				</div>
`,
	};

	return directive;
}

class CharacterAttributes {
	constructor () {
		this.showTooltip = this.showTooltip();
	}

	getProfessionCssClass (profession) {
		return styles[profession.toLowerCase()];
	}

	getProfessionAttributeName (profession) {
		let name = '';

		switch (profession.toLowerCase()) {
			case 'guardian':
				name = 'Virtue Recharge Rate'
				break;

			case 'warrior':
				name = 'Burst Recharge'
				break;

			case 'engineer':
				name = 'Tool Belt Recharge Rate';
				break;

			case 'ranger':
				name = 'Pet Attribute Bonus';
				break;

			case 'thief':
				name = 'Steal Recharge Rate';
				break;

			case 'elementalist':
				name = 'Attunement Recharge Rate';
				break;

			case 'mesmer':
				name = 'Shatter Skill Recharge Rate';
				break;

			case 'necromancer':
				name = 'Life Force Pool';
				break;

			case 'revenant':
				name = 'Cool Revenant Attribute';
				breakl

			default:
				name = 'Not sure :-)';
				break;
		}

		return name;
	}
}

export default component;