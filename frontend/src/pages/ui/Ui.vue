<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/cards/Card.vue'
import Input from '@/components/ui/inputs/Input.vue'
import TestForm from '@/components/ui/form/test/TestForm.vue'
</script>

<template>
  <div class="page container">
    <section class="page-top"></section>
    <section class="page-center">
      <div class="item">
        <h2>Buttons</h2>
        <div class="item-list">
          <Button variant="primary" class="list-item">Primary</Button>
          <Button variant="secondary" class="list-item">Secondary</Button>
          <Button variant="secondary" outline class="list-item"
            >Outlined
          </Button>
          <Button variant="primary" is-loading class="list-item"
            >Loading
          </Button>
        </div>
      </div>
      <div class="item">
        <h2>Cards</h2>
        <div class="item-list">
          <Card variant="primary" rounded>
            <template #card-top>Top card</template>
            <template #card-center>Center Card</template>
            <template #card-bottom>Bottom card</template>
          </Card>
          <Card variant="secondary" rounded>
            <template #card-top>Top card</template>
            <template #card-center>Center Card</template>
            <template #card-bottom>Bottom card</template>
          </Card>
          <Card variant="secondary" outlined rounded>
            <template #card-top>Top card</template>
            <template #card-center>Center Card</template>
            <template #card-bottom>Bottom card</template>
          </Card>
          <Card variant="primary" outlined rounded>
            <template #card-top>Top card</template>
            <template #card-center>Center Card</template>
            <template #card-bottom>Bottom card</template>
          </Card>
        </div>
      </div>
      <div class="item">
        <h2>Inputs</h2>
        <div class="item-list">
          <Input type="text" placeholder="text" />
          <Input type="number" placeholder="number" />
          <Input type="phone" placeholder="phone" />
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Input type="search" placeholder="search" />
        </div>
        <div class="item-list">
          <Input
            type="text"
            placeholder="text left"
            text-position="left"
            outlined
          />
          <Input
            type="number"
            placeholder="number center"
            text-position="center"
            outlined
          />
          <Input
            type="phone"
            placeholder="phone right"
            text-position="right"
            outlined
          />
        </div>
        <div class="item-list">
          <Input type="text" placeholder="text disabled" outlined disabled />
        </div>
      </div>
      <div class="item">
        <h2>Forms</h2>
        <div class="item-list">
          <TestForm />
        </div>
      </div>
    </section>
    <section class="page-bottom"></section>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-center {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 100px;
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  &-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}

.list {
  &-item {
    flex: 0 1 200px;
  }
}
</style>
