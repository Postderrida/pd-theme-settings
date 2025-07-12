const { Plugin, PluginSettingTab, Setting, TextAreaComponent, ButtonComponent, Modal } = require('obsidian');
const CUSTOM_SNIPPET_ID_PREFIX = 'custom-snippet-';
const i18n = {
  en: {
    editSnippet: 'Edit snippet',
    newSnippet: 'New snippet',
    namePlaceholder: 'Name',
    groupPlaceholder: 'Category',
    otherGroup: 'Other...',
    newGroupPlaceholder: 'New category',
    descPlaceholder: 'Description (optional)',
    cssCode: 'CSS code:',
    quickInsert: 'Quick insert:',
    save: 'Save',
    cancel: 'Cancel',
    addSnippet: 'Add snippet',
    configureCategories: 'Configure categories',
    categoryOrderTitle: 'Configure category order',
    categoryOrderDesc: 'Drag categories to change their order in the plugin settings.',
    resetOrder: 'Reset order',
    snippets: 'snippets',
    snippet: 'snippet',
    snippets2_4: 'snippets',
    settingsTitle: 'PostDerrida Theme Settings',
  },
  ru: {
    editSnippet: 'Редактировать сниппет',
    newSnippet: 'Новый сниппет',
    namePlaceholder: 'Название',
    groupPlaceholder: 'Категория',
    otherGroup: 'Другая...',
    newGroupPlaceholder: 'Новая категория',
    descPlaceholder: 'Описание (необязательно)',
    cssCode: 'CSS код:',
    quickInsert: 'Быстрые вставки:',
    save: 'Сохранить',
    cancel: 'Отмена',
    addSnippet: 'Добавить сниппет',
    configureCategories: 'Настроить категории',
    categoryOrderTitle: 'Настройка порядка категорий',
    categoryOrderDesc: 'Перетащите категории для изменения их порядка отображения в настройках плагина.',
    resetOrder: 'Сбросить порядок',
    snippets: 'сниппетов',
    snippet: 'сниппет',
    snippets2_4: 'сниппета',
    settingsTitle: 'PostDerrida Theme Settings',
  },
  fr: {
    editSnippet: 'Modifier le fragment',
    newSnippet: 'Nouveau fragment',
    namePlaceholder: 'Nom',
    groupPlaceholder: 'Catégorie',
    otherGroup: 'Autre...',
    newGroupPlaceholder: 'Nouvelle catégorie',
    descPlaceholder: 'Description (facultatif)',
    cssCode: 'Code CSS :',
    quickInsert: 'Insertion rapide :',
    save: 'Enregistrer',
    cancel: 'Annuler',
    addSnippet: 'Ajouter un fragment',
    configureCategories: 'Configurer les catégories',
    categoryOrderTitle: 'Configurer l’ordre des catégories',
    categoryOrderDesc: 'Faites glisser les catégories pour modifier leur ordre dans les paramètres du plugin.',
    resetOrder: 'Réinitialiser l’ordre',
    snippets: 'fragments',
    snippet: 'fragment',
    snippets2_4: 'fragments',
    settingsTitle: 'Paramètres du thème PostDerrida',
  },
  es: {
    editSnippet: 'Editar fragmento',
    newSnippet: 'Nuevo fragmento',
    namePlaceholder: 'Nombre',
    groupPlaceholder: 'Categoría',
    otherGroup: 'Otro...',
    newGroupPlaceholder: 'Nueva categoría',
    descPlaceholder: 'Descripción (opcional)',
    cssCode: 'Código CSS:',
    quickInsert: 'Inserción rápida:',
    save: 'Guardar',
    cancel: 'Cancelar',
    addSnippet: 'Agregar fragmento',
    configureCategories: 'Configurar categorías',
    categoryOrderTitle: 'Configurar el orden de las categorías',
    categoryOrderDesc: 'Arrastre las categorías para cambiar su orden en la configuración del complemento.',
    resetOrder: 'Restablecer orden',
    snippets: 'fragmentos',
    snippet: 'fragmento',
    snippets2_4: 'fragmentos',
    settingsTitle: 'Configuración del tema PostDerrida',
  },
  zh: {
    editSnippet: '编辑片段',
    newSnippet: '新片段',
    namePlaceholder: '名称',
    groupPlaceholder: '类别',
    otherGroup: '其他...',
    newGroupPlaceholder: '新类别',
    descPlaceholder: '描述（可选）',
    cssCode: 'CSS代码：',
    quickInsert: '快速插入：',
    save: '保存',
    cancel: '取消',
    addSnippet: '添加片段',
    configureCategories: '配置类别',
    categoryOrderTitle: '配置类别顺序',
    categoryOrderDesc: '拖动类别以更改其在插件设置中的顺序。',
    resetOrder: '重置顺序',
    snippets: '片段',
    snippet: '片段',
    snippets2_4: '片段',
    settingsTitle: 'PostDerrida主题设置',
  },
  ar: {
    editSnippet: 'تعديل المقتطف',
    newSnippet: 'مقتطف جديد',
    namePlaceholder: 'الاسم',
    groupPlaceholder: 'الفئة',
    otherGroup: 'أخرى...',
    newGroupPlaceholder: 'فئة جديدة',
    descPlaceholder: 'الوصف (اختياري)',
    cssCode: 'كود CSS:',
    quickInsert: 'إدراج سريع:',
    save: 'حفظ',
    cancel: 'إلغاء',
    addSnippet: 'إضافة مقتطف',
    configureCategories: 'تكوين الفئات',
    categoryOrderTitle: 'تكوين ترتيب الفئات',
    categoryOrderDesc: 'اسحب الفئات لتغيير ترتيبها في إعدادات الملحق.',
    resetOrder: 'إعادة الترتيب',
    snippets: 'مقتطفات',
    snippet: 'مقتطف',
    snippets2_4: 'مقتطفات',
    settingsTitle: 'إعدادات سمة PostDerrida',
  },
  be: {
    editSnippet: 'Рэдагаваць фрагмент',
    newSnippet: 'Новы фрагмент',
    namePlaceholder: 'Назва',
    groupPlaceholder: 'Катэгорыя',
    otherGroup: 'Іншая...',
    newGroupPlaceholder: 'Новая катэгорыя',
    descPlaceholder: 'Апісанне (неабавязкова)',
    cssCode: 'CSS-код:',
    quickInsert: 'Хуткая ўстаўка:',
    save: 'Захаваць',
    cancel: 'Адмена',
    addSnippet: 'Дадаць фрагмент',
    configureCategories: 'Наладзіць катэгорыі',
    categoryOrderTitle: 'Наладжванне парадку катэгорый',
    categoryOrderDesc: 'Перацягніце катэгорыі, каб змяніць іх парадак у наладах плагіна.',
    resetOrder: 'Скінуць парадак',
    snippets: 'фрагментаў',
    snippet: 'фрагмент',
    snippets2_4: 'фрагменты',
    settingsTitle: 'Налады тэмы PostDerrida',
  },
};

module.exports = class PostDerridaThemeSettings extends Plugin {
  async onload() {
    // Структура настроек только для кастомных сниппетов
    const defaultSettings = {
      customSnippets: [],
      snippetsOrder: [],
    };
    // Загружаем настройки из data.json
    const savedSettings = await this.loadData();
    this.settings = Object.assign({}, defaultSettings, savedSettings);
    // Инициализируем порядок, если пусто
    if (!this.settings.snippetsOrder || !this.settings.snippetsOrder.length) {
      this.settings.snippetsOrder = this.settings.customSnippets.map(s => s.id);
    }
    // Инициализируем настройки для всех сниппетов, если их нет
    let settingsChanged = false;
    for (const snip of this.settings.customSnippets) {
      if (snip.setting && this.settings[snip.setting] === undefined) {
        this.settings[snip.setting] = false;
        settingsChanged = true;
      }
    }
    // Сохраняем настройки, если были добавлены новые
    if (settingsChanged) {
      await this.saveData(this.settings);
    }
    // Добавляем вкладку настроек
    this.addSettingTab(new PostDerridaSettingTab(this.app, this));
    // Применяем активные сниппеты при загрузке
    for (const snip of this.getAllSnippets()) {
      if (this.settings[snip.setting]) {
        await this.enableSnippet(snip);
      }
    }
  }

  onunload() {
    // При выключении плагина только удаляем CSS-стили, но не изменяем настройки
    for (const snip of this.getAllSnippets()) {
      this.removeSnippetStyle(snip);
    }
  }

  async enableSnippet(snip) {
    if (document.getElementById(CUSTOM_SNIPPET_ID_PREFIX + snip.id)) return;
    const style = document.createElement('style');
    style.id = CUSTOM_SNIPPET_ID_PREFIX + snip.id;
    style.textContent = snip.content || '';
    document.head.appendChild(style);
    this.settings[snip.setting] = true;
    await this.saveData(this.settings);
  }

  async disableSnippet(snip) {
    this.removeSnippetStyle(snip);
    this.settings[snip.setting] = false;
    await this.saveData(this.settings);
  }

  removeSnippetStyle(snip) {
    const style = document.getElementById(CUSTOM_SNIPPET_ID_PREFIX + snip.id);
    if (style) style.remove();
  }

  getAllSnippets() {
    let custom = (this.settings.customSnippets || []).map(s => ({ ...s, isCustom: true }));
    let all = [...custom];
    if (this.settings.snippetsOrder && this.settings.snippetsOrder.length) {
      all.sort((a, b) => {
        let ia = this.settings.snippetsOrder.indexOf(a.id);
        let ib = this.settings.snippetsOrder.indexOf(b.id);
        if (ia === -1) ia = 9999;
        if (ib === -1) ib = 9999;
        return ia - ib;
      });
    }
    return all;
  }

  // Методы для работы с пользовательскими сниппетами
  async addCustomSnippet(snip) {
    this.settings.customSnippets.push(snip);
    this.settings.snippetsOrder.push(snip.id);
    await this.saveData(this.settings);
    await this.enableSnippet(snip);
  }

  async updateCustomSnippet(snip) {
    const idx = this.settings.customSnippets.findIndex(s => s.id === snip.id);
    if (idx !== -1) this.settings.customSnippets[idx] = snip;
    await this.saveData(this.settings);
    if (this.settings[snip.setting]) {
      // Сначала удаляем старый стиль, затем применяем новый
      this.removeSnippetStyle(snip);
      await this.enableSnippet(snip);
    }
  }

  async deleteCustomSnippet(id) {
    const idx = this.settings.customSnippets.findIndex(s => s.id === id);
    if (idx !== -1) {
      const snip = this.settings.customSnippets[idx];
      await this.disableSnippet(snip);
      this.settings.customSnippets.splice(idx, 1);
      this.settings.snippetsOrder = this.settings.snippetsOrder.filter(sid => sid !== id);
      await this.saveData(this.settings);
    }
  }

  // Методы для работы с порядком категорий
  getGroupsOrder() {
    if (!this.settings.groupsOrder) {
      const allSnippets = this.getAllSnippets();
      const allGroups = Array.from(new Set(allSnippets.map(s => s.group).filter(Boolean)));
      this.settings.groupsOrder = allGroups;
      this.saveData(this.settings);
    }
    return this.settings.groupsOrder || [];
  }

  async updateGroupsOrder(newOrder) {
    this.settings.groupsOrder = newOrder;
    await this.saveData(this.settings);
  }
};

class PostDerridaSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    const lsLang = window.localStorage.getItem('language');
    const rawLocale = lsLang || (this.app.vault && this.app.vault.getConfig && this.app.vault.getConfig('locale')) || this.app.locale || 'en';
    const locale = rawLocale.split('-')[0];
    const t = i18n[locale] || i18n['en'];
    containerEl.createEl('h2', { text: t.settingsTitle });
    const allSnippets = this.plugin.getAllSnippets();
    const allGroups = Array.from(new Set(allSnippets.map(s => s.group).filter(Boolean)));
    const groups = {};
    for (const snip of allSnippets) {
      if (!groups[snip.group]) groups[snip.group] = [];
      groups[snip.group].push(snip);
    }
    const groupsOrder = this.plugin.getGroupsOrder();
    const orderedGroups = groupsOrder.filter(group => allGroups.includes(group));
    const remainingGroups = allGroups.filter(group => !groupsOrder.includes(group));
    const finalGroupsOrder = [...orderedGroups, ...remainingGroups];
    for (const groupName of finalGroupsOrder) {
      containerEl.createEl('h3', { text: groupName });
      for (const snip of groups[groupName]) {
        const setting = new Setting(containerEl)
          .setName(snip.name)
          .setDesc(snip.desc && snip.desc.trim() ? snip.desc : t.descPlaceholder)
          .addToggle(toggle => {
            toggle.setValue(this.plugin.settings[snip.setting])
              .onChange(async (value) => {
                if (value) {
                  await this.plugin.enableSnippet(snip);
                } else {
                  await this.plugin.disableSnippet(snip);
                }
              });
          });
        setting.addExtraButton(btn => {
          btn.setIcon('pencil')
            .setTooltip(t.editSnippet)
            .onClick(() => this.openSnippetModal(snip, allGroups, t));
        });
        setting.addExtraButton(btn => {
          btn.setIcon('trash')
            .setTooltip(t.delete || 'Delete')
            .onClick(async () => {
              await this.plugin.deleteCustomSnippet(snip.id);
              this.display();
            });
        });
      }
    }
    // Кнопки управления
    const buttonsContainer = containerEl.createDiv();
    buttonsContainer.style.margin = '18px 0 0 0';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '10px';
    buttonsContainer.style.flexWrap = 'wrap';
    // Кнопка "Добавить сниппет"
    const addBtn = buttonsContainer.createEl('button', { text: t.addSnippet, cls: 'mod-cta' });
    addBtn.onclick = () => this.openSnippetModal(undefined, allGroups, t);
    // Кнопка "Настроить категории"
    const categoriesBtn = buttonsContainer.createEl('button', { text: t.configureCategories, cls: 'mod-warning' });
    categoriesBtn.onclick = () => this.openCategoriesModal(t);
  }

  openSnippetModal(snip, allGroups, t) {
    const isEdit = !!snip;
    const plugin = this.plugin;
    const groupOptions = allGroups;
    class SnippetModal extends Modal {
      constructor(app, onSave, snip, t) {
        super(app);
        this.onSave = onSave;
        this.snip = snip;
        this.t = t;
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl('h2', { text: this.snip ? this.t.editSnippet : this.t.newSnippet });
        const nameInput = contentEl.createEl('input', { type: 'text', placeholder: this.t.namePlaceholder });
        nameInput.style.width = '100%';
        nameInput.style.marginTop = '12px';
        nameInput.style.marginBottom = '12px';
        nameInput.value = this.snip?.name || '';
        // Категория — выпадающий список
        const groupRow = contentEl.createDiv({ style: 'margin: 8px 0;' });
        const groupSelect = groupRow.createEl('select');
        groupSelect.style.width = '100%';
        groupSelect.style.marginTop = '12px';
        groupSelect.style.marginBottom = '12px';
        groupOptions.forEach(opt => {
          const option = groupSelect.createEl('option');
          option.value = opt;
          option.text = opt;
        });
        const otherOption = groupSelect.createEl('option');
        otherOption.value = '__other__';
        otherOption.text = this.t.otherGroup;
        groupSelect.value = this.snip?.group && groupOptions.includes(this.snip.group) ? this.snip.group : (groupOptions[0] || this.t.groupPlaceholder);
        let customGroupInput = null;
        groupSelect.onchange = () => {
          if (groupSelect.value === '__other__') {
            if (!customGroupInput) {
              customGroupInput = groupRow.createEl('input', { type: 'text', placeholder: this.t.newGroupPlaceholder });
              customGroupInput.style.width = '100%';
              customGroupInput.style.marginTop = '12px';
              customGroupInput.style.marginBottom = '12px';
            }
            customGroupInput.style.display = '';
          } else if (customGroupInput) {
            customGroupInput.style.display = 'none';
          }
        };
        if (this.snip?.group && !groupOptions.includes(this.snip.group)) {
          groupSelect.value = '__other__';
          customGroupInput = groupRow.createEl('input', { type: 'text', placeholder: this.t.newGroupPlaceholder });
          customGroupInput.style.width = '100%';
          customGroupInput.style.marginTop = '12px';
          customGroupInput.style.marginBottom = '12px';
          customGroupInput.value = this.snip.group;
        }
        // Описание
        const descInput = contentEl.createEl('input', { type: 'text', placeholder: this.t.descPlaceholder });
        descInput.style.width = '100%';
        descInput.style.marginTop = '12px';
        descInput.style.marginBottom = '12px';
        descInput.value = this.snip?.desc && this.snip.desc !== this.t.userCssSnippetDesc ? this.snip.desc : '';
        // CSS область с подсветкой синтаксиса
        const cssAreaContainer = contentEl.createDiv();
        cssAreaContainer.style.marginTop = '8px';
        const cssAreaLabel = cssAreaContainer.createEl('label', { text: this.t.cssCode });
        cssAreaLabel.style.display = 'block';
        cssAreaLabel.style.marginBottom = '4px';
        cssAreaLabel.style.fontWeight = 'bold';
        
        const cssArea = new TextAreaComponent(cssAreaContainer);
        cssArea.setValue((typeof this.snip?.content === 'string') ? this.snip.content : '');
        cssArea.setPlaceholder(this.t.cssCode);
        cssArea.inputEl.style.width = '100%';
        cssArea.inputEl.style.height = '200px';
        cssArea.inputEl.style.fontFamily = 'monospace';
        cssArea.inputEl.style.fontSize = '12px';
        cssArea.inputEl.style.lineHeight = '1.4';
        cssArea.inputEl.style.padding = '8px';
        cssArea.inputEl.style.border = '1px solid var(--background-modifier-border)';
        cssArea.inputEl.style.borderRadius = '4px';
        cssArea.inputEl.style.backgroundColor = 'var(--background-primary)';
        cssArea.inputEl.style.color = 'var(--text-normal)';
        cssArea.inputEl.style.resize = 'vertical';
        
        // Добавляем CSS для подсветки синтаксиса
        const syntaxHighlightStyle = document.createElement('style');
        syntaxHighlightStyle.textContent = `
          .css-editor {
            font-family: 'Fira Code', 'Consolas', 'Monaco', monospace !important;
            background: var(--background-secondary) !important;
            border: 1px solid var(--background-modifier-border) !important;
            border-radius: 4px !important;
            padding: 8px !important;
            line-height: 1.4 !important;
            font-size: 12px !important;
            color: var(--text-normal) !important;
          }
          .css-editor:focus {
            border-color: var(--interactive-accent) !important;
            box-shadow: 0 0 0 2px rgba(127, 109, 242, 0.2) !important;
          }
        `;
        document.head.appendChild(syntaxHighlightStyle);
        
        // Применяем стили к textarea
        cssArea.inputEl.classList.add('css-editor');
        
        // Сохраняем ссылку на стиль для очистки
        this.syntaxHighlightStyle = syntaxHighlightStyle;
        
        // Автодополнение для CSS
        const cssProperties = [
          'color', 'background-color', 'font-size', 'font-weight', 'margin', 'padding',
          'border', 'border-radius', 'display', 'position', 'width', 'height',
          'text-align', 'text-decoration', 'line-height', 'opacity', 'transform',
          'transition', 'box-shadow', 'z-index', 'overflow', 'cursor', 'user-select'
        ];
        
        cssArea.inputEl.addEventListener('input', (e) => {
          const cursorPos = e.target.selectionStart;
          const value = e.target.value;
          const lineStart = value.lastIndexOf('\n', cursorPos - 1) + 1;
          const currentLine = value.substring(lineStart, cursorPos);
          
          // Если пользователь вводит ":" после свойства, добавляем пробел
          if (currentLine.includes(':') && !currentLine.includes(':')) {
            const colonIndex = currentLine.indexOf(':');
            if (colonIndex !== -1 && currentLine[colonIndex + 1] !== ' ') {
              const beforeColon = value.substring(0, lineStart + colonIndex);
              const afterColon = value.substring(lineStart + colonIndex + 1);
              const newValue = beforeColon + ': ' + afterColon;
              cssArea.setValue(newValue);
              e.target.setSelectionRange(cursorPos + 1, cursorPos + 1);
            }
          }
        });
        
        // Кнопки быстрых вставок
        const quickInsertContainer = contentEl.createDiv();
        quickInsertContainer.style.marginTop = '8px';
        quickInsertContainer.style.marginBottom = '8px';
        const quickInsertLabel = quickInsertContainer.createEl('label', { text: this.t.quickInsert });
        quickInsertLabel.style.display = 'block';
        quickInsertLabel.style.marginBottom = '4px';
        quickInsertLabel.style.fontWeight = 'bold';
        
        const quickInsertButtons = [
          { text: this.t.selector || 'Selector', code: 'selector {\n  property: value;\n}' },
          { text: this.t.mediaQuery || '@media', code: '@media (max-width: 768px) {\n  selector {\n    property: value;\n  }\n}' },
          { text: this.t.variable || 'Variable', code: ':root {\n  --variable-name: value;\n}' },
          { text: this.t.pseudoClass || 'Pseudo-class', code: 'selector:hover {\n  property: value;\n}' }
        ];
        
        const buttonsRow = quickInsertContainer.createDiv();
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.flexWrap = 'wrap';
        
        quickInsertButtons.forEach(btn => {
          const button = buttonsRow.createEl('button', { text: btn.text });
          button.style.fontSize = '11px';
          button.style.padding = '4px 8px';
          button.style.borderRadius = '3px';
          button.style.border = '1px solid var(--background-modifier-border)';
          button.style.backgroundColor = 'var(--background-secondary)';
          button.style.color = 'var(--text-normal)';
          button.style.cursor = 'pointer';
          
          button.onclick = () => {
            const currentValue = cssArea.getValue();
            const cursorPos = cssArea.inputEl.selectionStart;
            const beforeCursor = currentValue.substring(0, cursorPos);
            const afterCursor = currentValue.substring(cursorPos);
            const newValue = beforeCursor + '\n' + btn.code + '\n' + afterCursor;
            cssArea.setValue(newValue);
            
            // Устанавливаем курсор после вставленного кода
            const newCursorPos = cursorPos + btn.code.length + 2;
            cssArea.inputEl.setSelectionRange(newCursorPos, newCursorPos);
            cssArea.inputEl.focus();
          };
        });
        
        const saveBtn = contentEl.createEl('button', { text: this.t.save, cls: 'mod-cta' });
        saveBtn.style.marginTop = '16px';
        saveBtn.onclick = async () => {
          const name = nameInput.value.trim();
          let group = groupSelect.value;
          if (group === '__other__') {
            group = customGroupInput?.value.trim() || this.t.groupPlaceholder;
          }
          const content = cssArea.getValue() || '';
          const desc = descInput.value.trim() || this.t.descPlaceholder;
          if (!name) {
            nameInput.focus();
            return;
          }
          const snippetId = this.snip?.id || 'custom-' + Date.now();
          await this.onSave({
            id: snippetId,
            name,
            group,
            content,
            isCustom: true,
            setting: this.snip?.setting || snippetId,
            desc,
          }, !!this.snip);
          this.close();
        };
      }
      
      onClose() {
        // Удаляем добавленные стили при закрытии модального окна
        if (this.syntaxHighlightStyle) {
          this.syntaxHighlightStyle.remove();
        }
      }
    }
    const modal = new SnippetModal(this.app, async (newSnip, isEdit) => {
      if (isEdit) {
        await plugin.updateCustomSnippet(newSnip);
      } else {
        await plugin.addCustomSnippet(newSnip);
      }
      this.display();
    }, snip, t);
    modal.open();
  }

  openCategoriesModal(t) {
    const plugin = this.plugin;
    const settingTab = this;
    class CategoriesModal extends Modal {
      constructor(app, t) {
        super(app);
        this.settingTab = settingTab;
        this.t = t;
      }
      
      onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl('h2', { text: this.t.categoryOrderTitle });
        
        const description = contentEl.createEl('p', { 
          text: this.t.categoryOrderDesc,
          cls: 'setting-item-description'
        });
        description.style.marginBottom = '16px';
        
        // Получаем текущий порядок категорий
        const currentOrder = plugin.getGroupsOrder();
        const allSnippets = plugin.getAllSnippets();
        const allGroups = Array.from(new Set(allSnippets.map(s => s.group).filter(Boolean)));
        
        // Добавляем новые группы, которых нет в текущем порядке
        const missingGroups = allGroups.filter(group => !currentOrder.includes(group));
        const finalOrder = [...currentOrder, ...missingGroups];
        
        // Создаем контейнер для списка категорий
        const categoriesContainer = contentEl.createDiv();
        categoriesContainer.style.marginBottom = '16px';
        
        // Создаем перетаскиваемый список
        const categoriesList = categoriesContainer.createEl('div');
        categoriesList.style.border = '1px solid var(--background-modifier-border)';
        categoriesList.style.borderRadius = '4px';
        categoriesList.style.backgroundColor = 'var(--background-primary)';
        
        finalOrder.forEach((groupName, index) => {
          const categoryItem = categoriesList.createEl('div');
          categoryItem.style.padding = '12px 16px';
          categoryItem.style.borderBottom = '1px solid var(--background-modifier-border)';
          categoryItem.style.cursor = 'move';
          categoryItem.style.display = 'flex';
          categoryItem.style.alignItems = 'center';
          categoryItem.style.justifyContent = 'space-between';
          categoryItem.style.backgroundColor = 'var(--background-primary)';
          categoryItem.style.transition = 'background-color 0.2s ease';
          
          // Добавляем иконку перетаскивания
          const dragIcon = categoryItem.createEl('span', { text: '⋮⋮' });
          dragIcon.style.color = 'var(--text-muted)';
          dragIcon.style.marginRight = '8px';
          dragIcon.style.fontSize = '14px';
          dragIcon.style.fontWeight = 'bold';
          
          // Название категории
          const categoryName = categoryItem.createEl('span', { text: groupName });
          categoryName.style.flex = '1';
          categoryName.style.fontWeight = '500';
          
          // Количество сниппетов в категории
          const snippetsInGroup = allSnippets.filter(s => s.group === groupName).length;
          const snippetCount = categoryItem.createEl('span', { 
            text: `${snippetsInGroup} ${snippetsInGroup === 1 ? this.t.snippet : this.t.snippets}`,
            cls: 'setting-item-description'
          });
          snippetCount.style.fontSize = '12px';
          snippetCount.style.color = 'var(--text-muted)';
          
          // Добавляем обработчики для перетаскивания
          categoryItem.draggable = true;
          categoryItem.dataset.groupName = groupName;
          
          // Эффекты при наведении и перетаскивании
          categoryItem.addEventListener('mouseenter', () => {
            categoryItem.style.backgroundColor = 'var(--background-secondary)';
          });
          
          categoryItem.addEventListener('mouseleave', () => {
            categoryItem.style.backgroundColor = 'var(--background-primary)';
          });
          
          categoryItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', groupName);
            categoryItem.style.opacity = '0.5';
          });
          
          categoryItem.addEventListener('dragend', () => {
            categoryItem.style.opacity = '1';
          });
          
          categoryItem.addEventListener('dragover', (e) => {
            e.preventDefault();
            categoryItem.style.backgroundColor = 'var(--background-secondary-alt)';
          });
          
          categoryItem.addEventListener('dragleave', () => {
            categoryItem.style.backgroundColor = 'var(--background-primary)';
          });
          
          categoryItem.addEventListener('drop', (e) => {
            e.preventDefault();
            categoryItem.style.backgroundColor = 'var(--background-primary)';
            
            const draggedGroup = e.dataTransfer.getData('text/plain');
            if (draggedGroup !== groupName) {
              this.reorderCategories(draggedGroup, groupName);
            }
          });
        });
        
        // Кнопки управления
        const buttonsContainer = contentEl.createDiv();
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '10px';
        buttonsContainer.style.justifyContent = 'flex-end';
        
        // Кнопка "Сбросить порядок"
        const resetBtn = buttonsContainer.createEl('button', { text: this.t.resetOrder });
        resetBtn.onclick = () => {
          plugin.settings.groupsOrder = null;
          plugin.saveData(plugin.settings);
          this.close();
          this.open();
          // Обновляем страницу настроек после сброса
          this.settingTab.display();
        };
        
        // Кнопка "Сохранить"
        const saveBtn = buttonsContainer.createEl('button', { text: this.t.save, cls: 'mod-cta' });
        saveBtn.onclick = () => {
          this.close();
          // Обновляем страницу настроек после закрытия модального окна
          this.settingTab.display();
        };
      }
      
      reorderCategories(draggedGroup, targetGroup) {
        const currentOrder = plugin.getGroupsOrder();
        const draggedIndex = currentOrder.indexOf(draggedGroup);
        const targetIndex = currentOrder.indexOf(targetGroup);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
          // Удаляем перетаскиваемый элемент из текущей позиции
          currentOrder.splice(draggedIndex, 1);
          
          // Вставляем в новую позицию
          currentOrder.splice(targetIndex, 0, draggedGroup);
          
          // Сохраняем новый порядок
          plugin.updateGroupsOrder(currentOrder);
          
          // Обновляем отображение модального окна
          this.close();
          this.open();
          
          // Обновляем страницу настроек
          this.settingTab.display();
        }
      }
    }
    
    const modal = new CategoriesModal(this.app, t);
    modal.open();
  }
} 