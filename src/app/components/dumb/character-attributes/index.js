import styles from './character-attributes.less';
import iconStyles from '../../../styles/icons/icons.less';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			attributes: '=',
			profession: '@'
		},
		controller: CharacterAttributes,
		controllerAs: 'ctrl',
		template: `
			<div title="Attack power" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.attackPower}"></i>
					<span>{{ ctrl.attributes.power }}</span>
				</div>

				<div title="{{ attributes.profession }}" class="${styles.attribute}">
					<i
						ng-class="ctrl.getProfessionCssClass(ctrl.profession)" 
						class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon}"></i>
					<span>{{ ctrl.attributes.profession }}%</span>
				</div>

				<div title="Toughness" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.toughness}"></i>
					<span>{{ ctrl.attributes.toughness }}</span>
				</div>

				<div title="Armor" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.armor}"></i>
					<span>{{ ctrl.attributes.armor }}</span>
				</div>

				<div title="Vitality" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.vitality}"></i>
					<span>{{ ctrl.attributes.vitality }}</span>
				</div>

				<div title="Health" class="${styles.attribute} ${styles.attributeHealth}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.health}"></i>
					<span>{{ ctrl.attributes.health }}</span>
				</div>
				
				<div title="Precision" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.precision}"></i>
					<span>{{ ctrl.attributes.precision }}</span>
				</div>

				<div title="Critical Chance" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.criticalChance}"></i>
					<span>{{ ctrl.attributes.criticalChance }}%</span>
				</div>

				<div title="Ferocity" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.ferocity}"></i>
					<span>{{ ctrl.attributes.ferocity }}</span>
				</div>

				<div title="Critical Damage" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.criticalDamage}"></i>
					<span>{{ ctrl.attributes.criticalDamage }}%</span>
				</div>

				<div title="Condition Damage" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.conditionDamage}"></i>
					<span>{{ ctrl.attributes.conditionDamage }}</span>
				</div>

				<div title="Condition Duration" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.conditionDuration}"></i>
					<span>{{ ctrl.attributes.conditionDuration }}%</span>
				</div>

				<div title="Healing Power" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.healing}"></i>
					<span>{{ ctrl.attributes.healing }}</span>
				</div>

				<div title="Boon Duration" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.boon}"></i>
					<span>{{ ctrl.attributes.boon }}%</span>
				</div>

				<div title="Agony Resistance" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.agony}"></i>
					<span>{{ ctrl.attributes.agony }}</span>
				</div>

				<div title="Magic Find" class="${styles.attribute}">
					<i class="${iconStyles.icon} ${iconStyles.micro} ${styles.attributeIcon} ${styles.magicFind}"></i>
					<span>{{ ctrl.attributes.magic }}%</span>
				</div>
`,
	};

	return directive;
}

class CharacterAttributes {
	getProfessionCssClass (profession) {
		return styles[profession.toLowerCase()];
	}
}

export default component;