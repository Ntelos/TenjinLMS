<!-- <template>
    <main id="AbsencesView">
      Absences
    </main>
  </template> -->

  <template>
    <table-lite
      :is-static-mode="true"
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      @is-finished="table.isLoading = false"
    ></table-lite>
  </template>

<script>
import { reactive } from 'vue'
import TableLite from "vue3-table-lite"
export default({
  name: "App",
  components: { TableLite },
  setup() {
    const table = reactive({
      isLoading: false,
      columns: [ { label: "ID", field: "id", width: "3%", sortable: true, isKey: true, }, { label: "Name", field: "name", width: "10%", sortable: true, }, { label: "Email", field: "email", width: "15%", sortable: true, }, ],
      rows: [{ id: 1, name: 'jack', email: 'example@example.com' },{ id: 2, name: 'rose', email: 'example@example.com' }],
      totalRecordCount: 2, sortable: { order: "id", sort: "asc" }
    })
    return { table }
  }
})
</script>