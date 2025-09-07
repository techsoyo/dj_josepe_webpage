# 🔒 PROTOCOLO DE DESARROLLO - DJ JOSEPE WEBPAGE

## 🚨 REGLAS CRÍTICAS DE SEGURIDAD

### ⛔ PROHIBICIONES ABSOLUTAS:
- ❌ NO tocar la lógica principal del proyecto existente
- ❌ NO corromper la funcionalidad actual del sistema
- ❌ NO realizar cambios masivos sin control
- ❌ NO mezclar archivos de desarrollo con producción

### ✅ METODOLOGÍA OBLIGATORIA:
1. **PAUSA OBLIGATORIA** después de cada paso
2. **CONFIRMACIÓN EXPLÍCITA** antes de cada modificación
3. **CAMBIOS INCREMENTALES** y controlados
4. **VALIDACIÓN INMEDIATA** de cada cambio
5. **BACKUP IMPLÍCITO** antes de modificaciones críticas

### 🔥 REGLA FUNDAMENTAL - CONFIRMACIÓN ABSOLUTA:
**CADA SUGERENCIA QUE SE PROPONGA DEBE SER ABSOLUTAMENTE CONFIRMADA POR EL USUARIO ANTES DE IMPLEMENTAR CUALQUIER COSA**

- ❌ **PROHIBIDO**: Implementar cambios automáticamente sin esperar respuesta
- ❌ **PROHIBIDO**: Asumir que una propuesta será aceptada
- ❌ **PROHIBIDO**: Proceder sin confirmación explícita
- ✅ **OBLIGATORIO**: Esperar "SÍ" o "ADELANTE" del usuario
- ✅ **OBLIGATORIO**: Presentar alternativas y esperar decisión
- ✅ **OBLIGATORIO**: Respetar si el usuario dice "NO"

### 📝 REGLA DE DOCUMENTACIÓN OBLIGATORIA:
**CADA CAMBIO DEBE REGISTRARSE EN EL README_PROVISIONAL.MD**

- ✅ **OBLIGATORIO**: Actualizar README_provisional.md después de cada modificación
- ✅ **OBLIGATORIO**: Registrar qué se cambió, cuándo y por qué
- ✅ **OBLIGATORIO**: Mantener un log de todos los cambios realizados
- ✅ **OBLIGATORIO**: Incluir fecha, hora y descripción del cambio

### 📁 ESTRUCTURA DE ARCHIVOS:
- **PRODUCCIÓN**: `/frontend/`, `/backend/`, `/shared/`
- **DESARROLLO**: `/dev-workspace/` (esta carpeta)
- **TESTING**: Scripts y pruebas en `/dev-workspace/testing/`
- **DOCUMENTACIÓN**: `.md` temporales en `/dev-workspace/docs/`

### 🎯 ENFOQUE DE PRODUCCIÓN:
- Todo código debe ser **production-ready**
- Sin scripts temporales en carpetas de producción
- Documentación provisional se actualiza con cada cambio
- README definitivo se crea al final del proceso

## 📋 CHECKLIST ANTES DE CADA MODIFICACIÓN:
- [ ] ¿He confirmado explícitamente el cambio?
- [ ] ¿El cambio es incremental y controlado?
- [ ] ¿He validado que no afecta funcionalidad existente?
- [ ] ¿He actualizado la documentación provisional?
- [ ] ¿He registrado el cambio en README_provisional.md?
- [ ] ¿Estoy listo para hacer pausa y revisar?

## 🗣️ FORMATO OBLIGATORIO PARA PROPUESTAS:
```
PROPUESTA: [Descripción breve del cambio]
MOTIVO: [Por qué es necesario este cambio]
IMPACTO: [Qué archivos se modificarán]
ALTERNATIVAS:
- Opción A: [Descripción]
- Opción B: [Descripción]  
- Opción C: No hacer nada

❓ ¿Cuál eliges? Esperando tu confirmación antes de proceder...
```

## ⚠️ CONSECUENCIAS DE VIOLACIÓN:
- Pérdida de confianza del usuario
- Necesidad de rehacer trabajo
- Interrumpir el flujo de desarrollo
- Posible corrupción del proyecto

---
**FECHA CREACIÓN**: 6 de septiembre de 2025
**PROYECTO**: DJ Josepe Webpage - Integración Video GSAP
**RESPONSABLE**: GitHub Copilot AI Assistant
