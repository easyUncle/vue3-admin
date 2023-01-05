import { shallowRef, ref, onMounted, onUnmounted } from 'vue'

export function useEditor() {
  const editorRef = shallowRef(null)

  onMounted(() => {})

  onUnmounted(() => {
    const editor = editorRef.value
    editor && editor.destroy()
  })

  const handleCreated = editor => {
    editorRef.value = editor
  }

  return {
    editorRef,
    handleCreated
  }
}
